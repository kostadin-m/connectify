import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

//firebase
import { deleteObject, uploadBytes, getDownloadURL, listAll, ref } from "firebase/storage"
import { db, storage } from "../../firebase/config"
import { updateEmail, updateProfile } from "firebase/auth"
import { collection, doc, updateDoc } from "firebase/firestore"

//custom hooks
import { useAuthContext } from "./use-auth-context"

// utils
import { checkError } from "./utils/check-error"
import { uploadImage } from "./utils/upload-user-image"
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

async function deletePreviousImage(userID: string) {
    listAll(ref(storage, `thumbnails/${userID}/`)).then((listResults) => {
        const promises = listResults.items.map((item) => {
            return deleteObject(item);
        })
        Promise.all(promises);
    })
}

async function updateChatEngineUser(
    user: UserDocument,
    displayName: string,
    updatedDocument: updateUserFile,
    setError: React.Dispatch<React.SetStateAction<string | null>>) {

    let formData = new FormData()
    formData.append("email", updatedDocument.email);
    formData.append("username", displayName);

    if (updatedDocument.image) {
        formData.append("avatar", updatedDocument.image, updatedDocument.image.name);
    }

    await axios.patch(`https://api.chatengine.io/users/me/`, formData, {
        headers: {
            "Private-Key": '60216072-4b9e-4ac8-b321-571aaf652fcb',
            'user-name': user?.displayName,
            'user-secret': user?.id
        }
    }).catch((e) => setError(e))
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

                photoURL = await uploadImage(user?.id!, updatedDocument.image)
            }

            //Updating the user in ChatEngine
            await updateChatEngineUser(user!, displayName, updatedDocument, setError)

            //Updating the user in the DB
            const updatedObject = { displayName, photoURL, email: updatedDocument.email, location: updatedDocument.location }
            await updateDoc(documentRef, { ...updatedObject })

            //Updating the user in firebaseAuth
            if (user?.email !== updatedDocument.email) {
                await updateEmail(user?.firebaseUser!, updatedDocument.email)
            }
            if (user?.displayName !== displayName || user.photoURL !== photoURL) {
                await updateProfile(user?.firebaseUser!, { displayName, photoURL })
            }

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