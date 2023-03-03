import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


//firebase
import { deleteObject, listAll, ref } from "firebase/storage"
import { db, storage } from "../../firebase/config"
import { updateEmail, updateProfile } from "firebase/auth"
import { collection, doc, updateDoc } from "firebase/firestore"

//custom hooks
import { useAuthContext } from "./use-auth-context"

// utils
import { uploadImage } from "./utils/upload-user-image"
import { checkError } from "./utils/check-error"
import { editChatEngineUser } from "@features/chats/utils/chat-engine-api"

//types
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

async function deletePreviousImage(userID: string) {
    listAll(ref(storage, `thumbnails/${userID}/`)).then((listResults) => {
        const promises = listResults.items.map((item) => {
            return deleteObject(item);
        })
        Promise.all(promises);
    })
}


export const useEditUser = (): editUserState => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuthContext()

    let mounted = true

    const collectionRef = collection(db, 'users')
    const documentRef = doc(collectionRef, user?.id)

    const navigate = useNavigate()

    const editUser = async (updatedDocument: updateUserFile) => {
        if (mounted) {
            setIsPending(true)
        }
        try {
            const displayName = `${updatedDocument.firstName} ${updatedDocument.lastName}`
            let photoURL = user?.photoURL

            if (updatedDocument.image) {
                await deletePreviousImage(user?.id!)
                photoURL = await uploadImage("thumbnails", user?.id!, updatedDocument.image)
            }

            await editChatEngineUser(user!, { ...updatedDocument, displayName })

            const updatedObject = { displayName, photoURL, email: updatedDocument.email, location: updatedDocument.location }
            await updateDoc(documentRef, updatedObject)

            if (user?.email !== updatedDocument.email) await updateEmail(user?.firebaseUser!, updatedDocument.email)
            if (user?.displayName !== displayName) await updateProfile(user?.firebaseUser!, { displayName })
            if (user?.photoURL !== photoURL) await updateProfile(user?.firebaseUser!, { photoURL })

            if (mounted) {
                setIsPending(false)
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