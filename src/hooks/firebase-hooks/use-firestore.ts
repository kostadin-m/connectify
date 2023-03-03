import { useReducer, useEffect } from "react";
import { db, timeStamp } from "../../firebase/config";
import { addDoc, deleteDoc, doc, collection, updateDoc } from "firebase/firestore";
import { CollectionType } from "../../types";
import { checkError } from "./utils/check-error";


interface IDocumentState {
    success: boolean
    error: string | null
    isPending: boolean
}

type IDocumentAction =
    { type: "IS_PENDING", payload?: null } |
    { type: "ADD_DOCUMENT", payload?: null } |
    { type: "SET_ERROR", payload: string } |
    { type: 'UPDATED_DOCUMENT', payload?: null } |
    { type: "DELETE", payload?: null }

let initialState = {
    isPending: false,
    error: null,
    success: false
}

const firestoreReducer = (state: IDocumentState, action: IDocumentAction) => {
    switch (action.type) {
        case "IS_PENDING":
            return { isPending: true, success: false, error: null }
        case "ADD_DOCUMENT":
            return { isPending: false, success: true, error: null }
        case "SET_ERROR":
            return { isPending: false, error: action.payload, success: false }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, success: true, error: null }
        case "DELETE":
            return { isPending: false, success: true, error: null }
        default:
            return state
    }
}

export const useFirestore = <T extends CollectionType>(_collection: string) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    let mounted = true
    const ref = collection(db, _collection)

    const dispatchIfMounted = (action: IDocumentAction) => {
        if (mounted) {
            dispatch(action)
        }
    }
    const addDocument = async (doc: T) => {
        dispatchIfMounted({ type: 'IS_PENDING' })
        try {
            const createdAt = timeStamp.fromDate(new Date())
            await addDoc(ref, { ...doc, createdAt })
            dispatchIfMounted({ type: "ADD_DOCUMENT" })

        } catch (error) {
            const message = checkError(error)
            dispatchIfMounted({ type: 'SET_ERROR', payload: message })
        }
    }
    const updateDocument = async (id: string, updates: T) => {
        const documentRef = doc(ref, id)
        dispatchIfMounted({ type: 'IS_PENDING' })
        try {
            await updateDoc(documentRef, { ...updates })
            dispatchIfMounted({ type: "UPDATED_DOCUMENT" })
        } catch (error) {
            const message = checkError(error)
            dispatchIfMounted({ type: 'SET_ERROR', payload: message })
        }
    }
    const deleteDocument = async (id: string) => {
        const documentRef = doc(ref, id)
        dispatchIfMounted({ type: 'IS_PENDING' })
        try {
            await deleteDoc(documentRef)

            dispatchIfMounted({ type: "DELETE" })
        } catch (error) {
            const message = checkError(error)
            dispatchIfMounted({ type: 'SET_ERROR', payload: message })
        }
    }
    useEffect(() => {
        return () => { mounted = false }
    }, [mounted])

    return { addDocument, updateDocument, deleteDocument, response }
}