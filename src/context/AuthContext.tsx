import React from "react";
import { createContext, useEffect, useReducer } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { IContextProviderProps, IAuthState, IAuthActions, IAuthContext, UserObject } from "src/types";
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
            dispatch({
                type: 'AUTH_IS_READY', payload: data
            })
        })
        unsub()
    }, [])



    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider >
    )
}