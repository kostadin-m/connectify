import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore"

export const useDocument = (collection, id) => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [document, setDocument] = useState('')


    useEffect(() => {
        const ref = doc(db, collection, id)
        setIsPending(true)

        const unsub = onSnapshot(ref, (doc) => {

            if (doc.data()) {
                setDocument({ ...doc.data(), id: doc.id })
                setIsPending(false)
                setError(null)
            } else {
                setError('Project doesnt exist')
            }
        }, (error) => {
            setError(error.message)
            setIsPending(false)
        })

        return () => unsub()

    }, [collection, id])


    return { document, isPending, error }
}