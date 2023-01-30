import { useState } from "react"
import { db, auth } from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { useAuthContext } from "./useAuthContext"
import { useEffect } from "react"

export const useSignUp = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signUp = async (firstName, lastName, location, email, password, profileImg) => {
        setIsPending(true)
        setError(null)
        try {


            setIsCancelled(false)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (!res) {
                throw new Error('Could not complete Sign Up')
            }

            //upload user thumbnail
            const uploadPath = `thumbnails/${res.user.uid}/${profileImg.name}`
            const img = await projectStorage.ref(uploadPath).put(profileImg)
            const photoURL = await img.ref.getDownloadURL()

            // add Display Name to user
            await res.user.updateProfile({ displayName, photoURL })

            //create user schema
            const userData = {
                online: true,
                displayName,
                photoURL,
                friends: [],
                sentFriendRequests: [],
                receivedFriendRequests: []
            }

            const ref = doc(db, 'users', res.user.uid)
            //create a user document 
            setDoc(ref, userData)

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
        return () => setIsCancelled(true)

    }, [])
    return [error, isPending, signUp]

}