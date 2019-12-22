import { useState, useEffect } from 'react'

const windowExists = typeof window !== 'undefined'

function getLocalStorageValue<T>(key: string): T | null {
  if (!windowExists) {
    return null
  }

  const raw = window.localStorage.getItem(key)

  let v: T
  try {
    v = JSON.parse(raw)
  } catch (e) {
    v = null
  }

  return v
}

function setLocalStorageValue<T>(key: string, value: T) {
  if (!windowExists) {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Failed to write to local storage', e)
    // Nothing to do
  }
}

export default function usePersistentState<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T>(getLocalStorageValue(key) || defaultValue)

  useEffect(() => {
    setLocalStorageValue(key, value)
  }, [key, value])

  return [value, setValue]
}
