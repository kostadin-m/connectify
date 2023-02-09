import { useEffect, useState } from "react"
import { db } from "../../firebase/config"
import { collection, documentId, onSnapshot } from "firebase/firestore"
import { where, query } from "firebase/firestore"

export function useMultipleDocuments<T>(_collection: string, ids: string[]) {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [document, setDocument] = useState<T[]>()



    useEffect(() => {
        const ref = collection(db, _collection)
        const q = query(ref, where(documentId(), 'in', ids))
        setIsPending(true)
        debugger
        const unsub = onSnapshot(q, (docs) => {
            let result = [] as T[]
            docs.forEach((doc) => {
                result.push({ ...doc.data(), id: doc.id } as T)
            })
            setDocument(result)
            setIsPending(false)
            setError(null)
        }, (error) => {
            setError(error.message)
            setIsPending(false)
        })

        return () => unsub()

    }, [_collection, ids])


    return [document, isPending, error] as const
}