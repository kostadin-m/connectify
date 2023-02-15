import axios from "axios"

//firebase
import { deleteObject, uploadBytes, getDownloadURL, listAll, ref } from "firebase/storage"
import { db, storage } from "../../firebase/config"
import { updateEmail, updateProfile } from "firebase/auth"

//types
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { checkError } from "../../helpers/checkError"
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
                //Delete the old picture from Firebase Storage
                listAll(ref(storage, `thumbnails/${user?.id}/`)).then((listResults) => {
                    const promises = listResults.items.map((item) => {
                        return deleteObject(item);
                    })
                    Promise.all(promises);
                })
                //Updating the user pic in Firebase Storage
                const imageRef = ref(storage, `thumbnails/${user?.id}/${updatedDocument.image.name}`)
                await uploadBytes(imageRef, updatedDocument.image)
                photoURL = await getDownloadURL(imageRef)
            }

            //Updating the user in ChatEngine
            let formData = new FormData()
            formData.append("email", updatedDocument.email);
            formData.append("username", displayName);
            if (updatedDocument.image) {
                formData.append("avatar", updatedDocument.image, updatedDocument.image.name);
            }

            await axios.patch(`https://api.chatengine.io/users/${user?.chatEngineId}/`, formData, {
                headers: { "Private-Key": '419ce8c6-e52f-4fd2-9325-4a0b4b984bc1' }
            }).catch((e) => setError(e))


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