import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { IAuthContext } from "../types";



export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Context must be used inside a Context Provider')
    }

    const { firebaseUser, ...user } = context.user!
    return { firebaseUser, user, dispatch: context.dispatch, authIsReady: context.authIsReady }
}