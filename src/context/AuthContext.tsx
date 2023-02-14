import { createContext, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { auth, db } from "../firebase/config";
import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { IContextProviderProps, IAuthState, IAuthActions, IAuthContext, UserObject } from "../types";
import { getCurrentUserData } from "../helpers/getCurrentUserData"
import { useDocument } from "../hooks/firebase-hooks/useDocument";
import { DocumentSnapshot, doc, onSnapshot } from "firebase/firestore";


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
        let snapshotUnsub: Unsubscribe
        const unsub = onAuthStateChanged(auth, async (user) => {
            const userRef = doc(db, 'users', user?.uid || 'aa')
            if (user) {
                snapshotUnsub = onSnapshot(userRef, (snapshot: DocumentSnapshot) => {
                    if (snapshot.data()) {
                        const userSnapshotData = { firebaseUser: user, ...snapshot.data(), id: snapshot.id }
                        dispatch({
                            type: 'AUTH_IS_READY', payload: userSnapshotData as UserObject
                        })
                    }
                })
            } else {
                dispatch({
                    type: 'AUTH_IS_READY', payload: null
                })
            }
        })
        return () => { unsub(); snapshotUnsub() }
    }, [state.user?.id])

    return (
        <AuthContext.Provider value={{ ...state, dispatch } as IAuthContext}>
            {children}
        </AuthContext.Provider >
    )
}