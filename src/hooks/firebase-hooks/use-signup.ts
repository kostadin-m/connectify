import { useEffect, useState } from "react"
import axios from "axios"

//firebase
import { db } from "../../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth } from '../../firebase/config'


//custom hooks and utils
import { useAuthContext } from "@hooks"
import { checkError } from "./utils/check-error"
import { UserDocument, UserObject } from "../../types"
import { uploadImage } from "./utils/upload-user-image"
import { createChatEngineUser } from "@features/chats/utils"

export const useSignUp = () => {

    const [isCancelled, setIsCancelled] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState<boolean>(false)
    const { dispatch } = useAuthContext()


    const signUp = async (firstName: string, lastName: string, location: string, email: string, password: string, profileImg: File) => {
        setIsPending(true)
        setError(null)
        try {
            setIsCancelled(false)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const firebaseUser = res.user

            if (!res) {
                throw new Error('Could not complete Sign Up')
            }

            const photoURL = await uploadImage("thumbnails", firebaseUser.uid, profileImg)
            const displayName = `${firstName} ${lastName}`

            await updateProfile(firebaseUser, { displayName, photoURL })

            const userData = {
                email,
                displayName,
                photoURL,
                friends: [],
                location,
                sentFriendRequests: [],
                receivedFriendRequests: [],
                id: firebaseUser.uid,
            } as UserDocument

            await createChatEngineUser(userData, profileImg)

            const storageRef = doc(db, 'users', res.user.uid)
            await setDoc(storageRef, userData)
            const userObject = { firebaseUser, ...userData } as UserObject

            dispatch({ type: "LOGIN", payload: userObject })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (error) {
            if (!isCancelled) {
                setIsPending(false)
                const message = checkError(error)
                setError(message)
            }
        }

    }
    useEffect(() => {
        return () => setIsCancelled(true)

    }, [])
    return [error, isPending, signUp] as const

}