import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Context must be used inside a Context Provider')
    }



    const { firebaseUser, ...user } = context?.user || {}

    return { firebaseUser: context.user?.firebaseUser, user: { ...context.user }, dispatch: context.dispatch, authIsReady: context.authIsReady }
}