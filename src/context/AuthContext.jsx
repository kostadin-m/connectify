import { createContext, useEffect, useReducer } from "react";
import { db, auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()


export const authReducer = (state, action) => {
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

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,
        {
            user: null,
            authIsReady: false
        })
    useEffect(() => {

        const unsub = onAuthStateChanged(auth, async (user) => {
            let userData;
            if (user) {
                const ref = doc(db, 'users', user.uid)
                const additionalUserData = await getDoc(ref)
                userData = {
                    ...user,
                    sentFriendRequests: additionalUserData.sentFriendRequests,
                    receivedFriendRequests: additionalUserData.receivedFriendRequests
                }
            }
            dispatch({
                type: 'AUTH_IS_READY', payload: userData || null
            })
            unsub()
        })
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }
        }>
            {children}
        </AuthContext.Provider >
    )
}