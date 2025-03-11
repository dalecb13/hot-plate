export type GroupModel = {
  id: string
  groupName: string
  createdAt: string
  updatedAt: string
  ownerId: string
  groupDetails: object
  memberIds?: string[]
}

export type CreateGroupModel = {
  groupName: string
  groupDetails?: object
}
