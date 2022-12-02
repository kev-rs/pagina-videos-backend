
export type ResType<T> = 
  | { message: string }
  | { error: string }
  | { data: T }