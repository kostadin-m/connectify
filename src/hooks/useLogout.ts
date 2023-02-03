import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch, user } = useAuthContext()
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const logout = async () => {
        setError(null)
        setIsPending(true)
        try {
            const ref = doc(db, 'users', user.uid)
            //update online state
            updateDoc(ref, { online: false })

            //sign out the user
            signOut(auth)

            //dispatch logout action
            dispatch({ type: "LOGOUT" })

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }

        } catch (error) {
            if (!isCancelled) {
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }

        }
    }
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])



    return [error, isPending, logout]
}