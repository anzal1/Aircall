export interface Call {
  direction: string
  from: number
  to: number
  via: number
  duration: number
  call_type: string
  is_archived: boolean
  id: string
  created_at: string
}

export interface GroupedCalls {
  [key: string]: Call[]
}
