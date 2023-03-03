import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./use-auth-context";
import { useEffect, useState } from "react";
import { checkError } from "./utils/check-error";


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
            await signOut(auth)

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