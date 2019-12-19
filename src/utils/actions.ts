/* eslint-disable @typescript-eslint/no-explicit-any */
export type Action<T extends string = string, P = void> = P extends void
  ? Readonly<{ type: T }>
  : Readonly<{ type: T; payload: P }>

export type ActionUnion<A extends { [key: string]: (...ags: any[]) => any }> = ReturnType<A[keyof A]>

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(type: T, payload: P): Action<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}
