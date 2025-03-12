export type MatchModel = {
  id: number
  groupId: number
  createdAt: string
  matchDetails: object
}

export type CreateMatchModel = {
  groupId: number
  matchDetails: object
}
