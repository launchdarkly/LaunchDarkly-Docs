import { useEffect, useRef } from 'react'

export function usePrevious<T extends object>(value: T) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current //in the end, return the current ref value.
}
