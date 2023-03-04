import { deleteObject, listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/config";

export async function deletePreviousImage(userID: string) {
    listAll(ref(storage, `thumbnails/${userID}/`)).then((listResults) => {

        const promises = listResults.items.map((item) => deleteObject(item))

        Promise.all(promises);
    })
}

export async function uploadImage(folderPath: string, userID: string, image: File) {
    const imageRef = ref(storage, `${folderPath}/${userID}/${image.name}`)
    await uploadBytes(imageRef, image)
    const photoURL = await getDownloadURL(imageRef)

    return photoURL
}