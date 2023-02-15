import { useEffect, useState } from "react"

//firebase
import { db, auth } from "../../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { storage } from '../../firebase/config'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"

//custom hooks and helpers
import { useAuthContext } from "./useAuthContext"
import { checkError } from "../../helpers/checkError"
import { UserDocument, UserObject } from "../../types"
import axios from "axios"

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
            //upload user thumbnail
            const imageRef = ref(storage, `thumbnails/${firebaseUser.uid}/${profileImg.name}`)
            await uploadBytes(imageRef, profileImg)
            const photoURL = await getDownloadURL(imageRef)

            const displayName = `${firstName} ${lastName}`

            // add Display Name to user
            await updateProfile(firebaseUser, { displayName, photoURL })

            //create user schema


            //Creating user in chat engine
            let formData = new FormData()
            formData.append("email", email);
            formData.append("username", displayName);
            formData.append("secret", firebaseUser.uid);
            formData.append("avatar", profileImg, profileImg.name);

            let chatEngineId: number | null = null

            await axios
                .post("https://api.chatengine.io/users/", formData,
                    { headers: { "Private-Key": '419ce8c6-e52f-4fd2-9325-4a0b4b984bc1' } })
                .then((data) => chatEngineId = data.data.id)
                .catch((e) => setError(e.data.details));

            const userData = {
                email,
                displayName,
                photoURL,
                online: true,
                friends: [],
                location,
                sentFriendRequests: [],
                receivedFriendRequests: [],
                id: firebaseUser.uid,
                chatEngineId: chatEngineId!
            } as UserDocument

            const storageRef = doc(db, 'users', res.user.uid)
            //create a user document  with the user Schema
            await setDoc(storageRef, userData)
            const userObject = { firebaseUser, ...userData } as UserObject

            //dispatch login action with the user auth object and user schema object
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