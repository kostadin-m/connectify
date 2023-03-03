import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect } from "react"
import { auth } from '../../firebase/config'
import { checkError } from "src/hooks/utils/check-error"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const login = async (email: string, password: string) => {
        setIsPending(true)
        setError(null)
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            if (!res) {
                throw new Error('Could not complete Sign Up')
            }
            if (!isCancelled) setIsPending(false); setError(null)

        } catch (error) {
            if (!isCancelled) {
                setIsPending(false)
                const message = checkError(error)
                setError(message)
            }
        }
    }
    useEffect(() => {
        return () => { setIsCancelled(true) }
    }, [])

    return { error, isPending, login }

}