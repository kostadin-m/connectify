import { useEffect, useState } from "react"
import { db } from "@firebase-config"
import { doc, onSnapshot } from "firebase/firestore"



export function useDocument<T>(collection: string, id: string | null) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [document, setDocument] = useState<T>()

  useEffect(() => {
    const ref = doc(db, collection, id!)
    setIsPending(true)

    const unsub = onSnapshot(ref, (doc) => {
      if (!doc.data()) return setIsPending(false); setError(`Project doesnt exist`)
      setDocument({ ...doc.data(), id: doc.id } as T)
      setIsPending(false)
      setError(null)

    }, (error) => {
      setError(error.message)
      setIsPending(false)
    })
    return () => unsub()
  }, [collection, id])


  return { document, isPending, error }
}