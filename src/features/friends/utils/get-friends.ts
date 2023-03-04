import { UserDocument } from "@types"
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore"
import { SetStateAction, useEffect } from "react"
import { db } from "../../../firebase/config"

export function getFriends(ids: string[], setState: React.Dispatch<SetStateAction<UserDocument[]>>) {
    useEffect(() => {
        if (ids?.length === 0 || !ids) return
        const ref = query(collection(db, 'users'), where(documentId(), 'in', ids))
        const unsub = onSnapshot(ref, (snapshot) => {
            if (!snapshot) return

            const result = [] as UserDocument[]
            snapshot.docs.forEach((doc) => result.push({ ...doc.data(), id: doc.id } as UserDocument))

            setState(result)
        })
        return () => unsub()
    }, [ids?.length])
}