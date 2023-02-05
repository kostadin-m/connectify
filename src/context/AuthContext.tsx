
import { createContext, useEffect, useReducer, useState } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { IContextProviderProps, IAuthState, IAuthActions, IAuthContext, IAuthUserObject } from "../types";
import { getCurrentUserData } from "../helpers/getCurrentUserData"


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
        const unsub = onAuthStateChanged(auth, async (user) => {
            const data = await getCurrentUserData(user)
            const userData = user ? { firebaseUser: user, ...data, id: user?.uid } : { firebaseUser: user }
            dispatch({
                type: 'AUTH_IS_READY', payload: userData as IAuthUserObject
            })
        })
        unsub()
    }, [])



    return (
        <AuthContext.Provider value={{ ...state, dispatch } as IAuthContext}>
            {children}
        </AuthContext.Provider >
    )
}