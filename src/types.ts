import { User } from "firebase/auth";
import { ChatCardProps, ChatHeaderProps, ChatObject } from "react-chat-engine-advanced";

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

//User Data in the auth

export interface UserObject {
    email: string
    online: boolean
    displayName: string
    friends: NonNullable<FriendsObject[]>
    location: string
    sentFriendRequests: NonNullable<FriendsObject[]>
    receivedFriendRequests: NonNullable<FriendsObject[]>
    photoURL: string
    id: string
    firebaseUser: User
}
export type UserDocument = Omit<UserObject, 'firebaseUser'>

//Auth Reducer State
export interface IAuthState {
    user: UserObject | null,
    authIsReady: boolean
}
//Auth Reducer Actions
export type IAuthActions = { type: 'LOGIN' | 'AUTH_IS_READY', payload: UserObject | null } | { type: 'LOGOUT', payload?: null }


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
export type CollectionType = FriendsObject | UserObject

export interface ICollectionState<T extends CollectionType> {
    document: T[] | null
    error: string | null
    isPending: boolean

}
export type ICollectionAction<T extends CollectionType> =
    { type: "IS_PENDING", payload?: null } |
    { type: "ADD_DOCUMENTS", payload: T[] | null } |
    { type: "ERROR", payload: string }

type NonNullable<T> = Exclude<T, null | undefined>

export interface FriendsObject {
    displayName: string
    photoURL: string
    id: string
    friends: NonNullable<FriendsObject[]>
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


export interface CustomChatHeaderProps extends ChatHeaderProps {
    chat?: ChatObject;
    username: string;
    secret: string;
}
export interface CustomChatCardProps extends ChatCardProps {
    username: string;
    isActive: boolean;
    onChatCardClick: (chatId: number) => void;
    chat?: ChatObject;
}

