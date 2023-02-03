import { useState } from "react"
import { auth, db } from "../firebase/config"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"
import { useEffect } from "react"
import { getCurrentUserData } from "src/helpers/getCurrentUserData"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email: string, password: string) => {
        setIsPending(true)
        setError(null)
        try {

            const res = await signInWithEmailAndPassword(auth, email, password)
            if (!res) {
                throw new Error('Could not complete Sign Up')
            }

            const ref = doc(db, 'users', res.user.uid)
            //update online state
            updateDoc(ref, { online: true })


            const user = await getCurrentUserData(res.user)

            //dispatch login action
            dispatch({ type: "LOGIN", payload: user })
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



    return [error, isPending, login] as const

}