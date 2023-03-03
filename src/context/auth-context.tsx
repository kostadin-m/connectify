import { createContext, useEffect, useReducer } from "react";

import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/config";
import { DocumentSnapshot, doc, onSnapshot } from "firebase/firestore";
//types
import { IContextProviderProps, UserObject } from "@types";



interface IAuthState {
    user: UserObject | null,
    authIsReady: boolean
}

type IAuthActions = { type: 'LOGIN' | 'AUTH_IS_READY', payload: UserObject | null } | { type: 'LOGOUT', payload?: null }



interface IAuthContext extends IAuthState {
    dispatch: (action: IAuthActions) => void
}


export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const authReducer = (state: IAuthState, action: IAuthActions) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        case "AUTH_IS_READY":
            return { ...state, authIsReady: true, user: action.payload }
        default: return state
    }
}

export const AuthContextProvider = ({ children }: IContextProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false })

    useEffect(() => {
        let snapshotUnsub: Unsubscribe = () => null
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) return dispatch({ type: 'AUTH_IS_READY', payload: null })

            const userRef = doc(db, 'users', user.uid)
            snapshotUnsub = onSnapshot(userRef, (snapshot: DocumentSnapshot) => {
                const userSnapshotData = { firebaseUser: user, ...snapshot.data(), id: snapshot.id }
                dispatch({ type: 'AUTH_IS_READY', payload: userSnapshotData as UserObject })
            })
        })
        return () => { unsub(), snapshotUnsub() }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch } as IAuthContext}>
            {children}
        </AuthContext.Provider >
    )
}