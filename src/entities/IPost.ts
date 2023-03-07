export interface IPost {
  userId: number
  id?: any
  title: string
  body: string
  reactions: Reaction
}

export interface AddPost{
  userId: number
  id?: any
  title: string
  body: string
}

export interface Reaction {
  thumbsUp: number,
  wow: number,
  heart: number,
  rocket: number,
  coffee: number
}