interface ITask {
  id: number
  title: string
  completed: boolean
  user?: string
  created_at?: string
}

export type { ITask }