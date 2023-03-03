import { useEffect, useState } from "react"


//firebase
import { db } from "../../firebase/config"
import { updateEmail, updateProfile } from "firebase/auth"
import { collection, doc, updateDoc } from "firebase/firestore"

//custom hooks
import { useAuthContext } from "./use-auth-context"

// utils
import { checkError } from "../utils/check-error"
import { editChatEngineUser } from "@features/chats/utils/chat-engine-api"
import { deletePreviousImage, uploadImage } from "@features/ui/images"
import { UserDocument } from "@types"

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

const editUserInTheDatabase = async (user: UserDocument) => {
    const collectionRef = collection(db, 'users')
    const documentRef = doc(collectionRef, user?.id)

    await updateDoc(documentRef, user)
}


export const useEditUser = (): editUserState => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuthContext()

    let mounted = true


    const editUser = async (updatedDocument: updateUserFile) => {
        if (mounted) { setIsPending(true) }
        try {
            const displayName = `${updatedDocument.firstName} ${updatedDocument.lastName}`
            let photoURL = user?.photoURL

            if (updatedDocument.image) {
                await deletePreviousImage(user?.id!)
                photoURL = await uploadImage("thumbnails", user?.id!, updatedDocument.image)
            }

            await editChatEngineUser(user!, { ...updatedDocument, displayName })

            const updatedUser = { displayName, photoURL, email: updatedDocument.email, location: updatedDocument.location } as UserDocument
            await editUserInTheDatabase(updatedUser)

            if (user?.email !== updatedDocument.email) await updateEmail(user?.firebaseUser!, updatedDocument.email)
            if (user?.displayName !== displayName) await updateProfile(user?.firebaseUser!, { displayName })
            if (user?.photoURL !== photoURL) await updateProfile(user?.firebaseUser!, { photoURL })

            if (mounted) { setIsPending(false) }

        } catch (error) {
            const message = checkError(error)

            if (mounted) { setError(message) }
        }
    }
    useEffect(() => {
        return () => { mounted = false }
    }, [mounted])

    return { error, isPending, editUser }
}