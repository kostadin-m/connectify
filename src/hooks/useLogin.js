import { useState } from "react"
import { auth, db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import { useAuthContext } from "./useAuthContext"
import { useEffect } from "react"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState('')
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsPending(true)
        setError(null)
        try {

            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            if (!res) {
                throw new Error('Could not complete Sign Up')
            }

            const ref = doc(db, 'users', res.user.uid)
            //update online state
            updateDoc(ref, { online: true })

            //dispatch login action
            dispatch({ type: "LOGIN", payload: res.user })
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }


        } catch (error) {
            if (!isCancelled) {
                setIsPending(false)
                console.log(error.message)
                setError(error.message)
            }
        }

    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])



    return [error, isPending, login]

}