//firebase
import { deleteObject, uploadBytes, getDownloadURL, listAll, ref } from "firebase/storage"
import { db, storage } from "../firebase/config"
import { updateEmail, updateProfile } from "firebase/auth"

//types
import { UserObject } from "../types"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { checkError } from "../helpers/checkError"
import { collection, doc, updateDoc } from "firebase/firestore"

type updateUserFile = {
    firstName: string,
    lastName: string,
    email: string,
    location: string,
    image: File | null,
}

type editUserState = {
    isPending: boolean,
    error: null | string,
    editUser: (updatedDocument: updateUserFile) => Promise<void>
}


export const useEditUser = (): editUserState => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user, dispatch } = useAuthContext()

    let mounted = true

    const collectionRef = collection(db, 'users')
    const documentRef = doc(collectionRef, user?.id)

    const navigate = useNavigate()

    const editUser = async (updatedDocument: updateUserFile) => {
        debugger
        if (mounted) {
            setIsPending(true)
        }
        try {
            const displayName = `${updatedDocument.firstName} ${updatedDocument.lastName}`
            let photoURL = user?.photoURL


            if (updatedDocument.image) {
                //delete the old picture from the storage
                listAll(ref(storage, `thumbnails/${user?.id}/`)).then((listResults) => {
                    const promises = listResults.items.map((item) => {
                        return deleteObject(item);
                    })
                    Promise.all(promises);
                })
                //add the new picture to the storage
                const imageRef = ref(storage, `thumbnails/${user?.id}/${updatedDocument.image.name}`)
                await uploadBytes(imageRef, updatedDocument.image)
                photoURL = await getDownloadURL(imageRef)
            }

            const updatedObject = { displayName, photoURL, email: updatedDocument.email, location: updatedDocument.location }
            await updateDoc(documentRef, { ...updatedObject })

            if (user?.email !== updatedDocument.email) {
                await updateEmail(user?.firebaseUser!, updatedDocument.email)
            }
            if (user?.displayName !== displayName || user.photoURL !== photoURL) {
                await updateProfile(user?.firebaseUser!, { displayName, photoURL })
            }
            if (mounted) {
                setIsPending(false)
                dispatch({ type: 'AUTH_IS_READY', payload: { ...user, ...updatedObject } as UserObject })
                navigate('/')
            }
        } catch (error) {
            const message = checkError(error)
            if (mounted) {
                setError(message)
            }
        }
    }
    useEffect(() => {
        return () => {
            mounted = false
        }
    }, [mounted])

    return { error, isPending, editUser }
}