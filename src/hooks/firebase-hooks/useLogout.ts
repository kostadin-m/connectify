import { db, auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import { checkError } from "./utils/checkError";


type useLogoutState = { isPending: boolean, error: string | null, logout: () => Promise<void> }

export const useLogout = (): useLogoutState => {
    const { dispatch, user } = useAuthContext()
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    let mounted = true

    const logout = async () => {
        setError(null)
        setIsPending(true)
        try {
            const collectionRef = collection(db, 'users')
            const ref = doc(collectionRef, user?.id)
            //update online state
            await updateDoc(ref, { online: false })

            //sign out the user
            await signOut(auth)

            //dispatch logout action
            dispatch({ type: "LOGOUT" })

            if (mounted) {
                setError(null)
                setIsPending(false)
            }

        } catch (error) {
            if (mounted) {
                const message = checkError(error)
                setError(message)
                setIsPending(false)
            }

        }
    }
    useEffect(() => {
        return () => { mounted = true }
    }, [mounted])

    return { error, isPending, logout }
}