import { UserObject } from "../types"

export const isUser = (user: UserObject | {}) => Object.keys(user).length > 0