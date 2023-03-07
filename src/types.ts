import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

//Context Provider
export interface IContextProviderProps {
    children: React.ReactNode;
}

//Image Input Props
export interface IImageInput {
    onImageChange: (value: File | null) => void
    onImageErrorChange: (value: string | null) => void
}

//CSS Classes State 
export type CSSClassesState = 'hidden' | 'show'

//User Data in the auth

export interface UserObject {
    email: string
    displayName: string
    friends: NonNullable<string[]>
    location: string
    sentFriendRequests: NonNullable<string[]>
    receivedFriendRequests: NonNullable<string[]>
    photoURL: string
    id: string
    firebaseUser?: User
}

//Firebase

//1. Collections

export type CollectionType = UserDocument | PostObject

type NonNullable<T> = Exclude<T, null | undefined>


//Objects in the DB
export type UserDocument = Omit<UserObject, 'firebaseUser'>

export interface CommentObject {
    creatorID: string
    createdAt: Timestamp
    commentContent: string
}
export interface PostObject {
    postTitle: string,
    photoURL: string,
    creatorID: string,
    location: string,
    createdAt: Timestamp,
    comments: CommentObject[],
    likes: string[]
}
export interface PostDocument extends PostObject {
    id: string
}





