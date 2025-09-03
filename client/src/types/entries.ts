export interface Entry {
  id: string
  name: string
  status: string
  grade: string
  series?: string
  images: Array<string>
  owner_id: string
  dateAdded: string
}

export interface EntryForm {
  id: string
  name: string
  status: string
  grade: string
  series?: string
  image?: string | null
  dateAdded: string
}

export type Grades =
  | 'high_grade'
  | 'real_grade'
  | 'master_grade'
  | 'perfect_grade'

export type Status = 'Backlog' | 'In Progress' | 'Completed'
