import { useState, useReducer, useEffect } from "react";
import { db, timeStamp } from "../firebase/config";
import { addDoc, deleteDoc, doc, collection, setDoc } from "firebase/firestore";
import { IDocumentAction, IDocumentState, CollectionType } from "src/types";
import { checkError } from "src/helpers/checkError";

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

export const useFirestore = (_collection: string) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)


    const ref = collection(db, _collection)


    const dispatchIfNotCancelled = (action: IDocumentAction) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }
    //add a document 
    const addDocument = async<T extends CollectionType>(doc: T) => {
        dispatchIfNotCancelled({ type: 'IS_PENDING' })
        try {
            const createdAt = timeStamp.fromDate(new Date())
            await addDoc(ref, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: "ADD_DOCUMENT" })

        } catch (error) {
            const message = checkError(error)
            dispatchIfNotCancelled({ type: 'SET_ERROR', payload: message })
        }
    }

    // update existing document
    const updateDocument = async <T extends CollectionType>(id: string, updates: T) => {
        const documentRef = doc(ref, id)
        dispatchIfNotCancelled({ type: 'IS_PENDING' })
        try {
            await setDoc(documentRef, updates)
            dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT" })
        } catch (error) {
            const message = checkError(error)
            dispatchIfNotCancelled({ type: 'SET_ERROR', payload: message })
        }
    }

    //delete document
    const deleteDocument = async (id: string) => {
        const documentRef = doc(ref, id)
        dispatchIfNotCancelled({ type: 'IS_PENDING' })
        try {
            await deleteDoc(documentRef)

            dispatchIfNotCancelled({ type: "DELETE" })
        } catch (error) {
            const message = checkError(error)
            dispatchIfNotCancelled({ type: 'SET_ERROR', payload: message })
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, updateDocument, deleteDocument, response }
}