import { User } from "firebase/auth";
import { ChatHeaderProps, ChatObject } from "react-chat-engine-advanced";

//Context Provider
export interface IContextProviderProps {
    children: React.ReactNode;
}


//CSS Classes State 

export type CSSClassesState = 'hidden' | 'show'

//Theme Context Interfaces

//Theme Context Reducer State
export interface IThemeState {
    theme: string
}
// Theme Context Reducer Actions
export interface IThemeActions {
    type: 'TOGGLE_THEME'
    payload: 'light' | 'dark'
}

//Theme Context Dispatch Function
export interface IThemeContext {
    theme: string
    toggleTheme: () => void
}

//Auth Context Interfaces

//User Data in the db

export interface UserObject {
    readonly online: boolean
    readonly displayName: string | null
    readonly friends: FriendsObject[]
    readonly location: string
    readonly sentFriendRequests: object[]
    readonly receivedFriendRequests: object[]
    readonly photoURL: string | null
}

//User Data in the Auth
export interface IAuthUserObject extends UserObject, User {

}
//Auth Reducer State
export interface IAuthState {
    user: IAuthUserObject | null,
    authIsReady: boolean
}
//Auth Reducer Actions
export interface IAuthActions {
    type: 'LOGIN' | 'LOGOUT' | 'AUTH_IS_READY'
    payload: IAuthUserObject | null
}
//AuthContext dipatch function
export interface IAuthContext extends IAuthState {
    dispatch: (action: IAuthActions) => void
}


//Image Preview Props

export interface IPreviewImage {
    image: File
    style: string
}
export interface IImageInput {
    setImage: React.Dispatch<React.SetStateAction<File | null>>
    setImageError: React.Dispatch<React.SetStateAction<string | null>>
}

//Firebase

//1. Collections

//define all the types that a collection accepts
export type CollectionType = FriendsObject

export interface ICollectionState<T extends CollectionType> {
    document: T[] | null
    error: string | null
    isPending: boolean

}
export type ICollectionAction<T extends CollectionType> =
    { type: "IS_PENDING", payload?: null } |
    { type: "ADD_DOCUMENTS", payload: T[] | null } |
    { type: "ERROR", payload: string }


export interface FriendsObject {
    displayName: string
    photoURL: string
    id: string
    friends: FriendsObject[]
}

//2.Documents

export interface IDocumentState {
    success: boolean
    error: string | null
    isPending: boolean
}

export type IDocumentAction =
    { type: "IS_PENDING", payload?: null } |
    { type: "ADD_DOCUMENT", payload?: null } |
    { type: "SET_ERROR", payload: string } |
    { type: 'UPDATED_DOCUMENT', payload?: null } |
    { type: "DELETE", payload?: null }



//3.Chat Engine Custom Interfaces


interface CustomChatHeaderProps extends ChatHeaderProps {
    chat?: ChatObject;
    username: string;
    secret: string;
}

