import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect } from "react"
import { auth } from '../../firebase/config'

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
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (error) {
            if (!isCancelled) {
                setIsPending(false)
                let message = 'Unknown Error'
                if (error instanceof Error) message = error.message
                console.log(message)
                setError(message)
            }
        }
    }
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { error, isPending, login }

}