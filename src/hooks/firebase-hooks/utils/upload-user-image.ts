import { storage } from "../../../firebase/config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export async function uploadImage(folderPath: string, userID: string, image: File) {
    const imageRef = ref(storage, `${folderPath}/${userID}/${image.name}`)
    await uploadBytes(imageRef, image)
    const photoURL = await getDownloadURL(imageRef)

    return photoURL
}