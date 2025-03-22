export type MatchModel = {
  id: number
  address: string
  country: string
  city: string
  budget: number
  categories: string[]
  locale: string
  isActive: boolean
}

export type CreateMatchModel = {
  groupId: number
  matchDetails: object
}
