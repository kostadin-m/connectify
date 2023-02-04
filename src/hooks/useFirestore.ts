import { useState, useReducer, useEffect } from "react";
import { db, timeStamp } from "../firebase/config";
import { addDoc, deleteDoc, doc, collection, setDoc, updateDoc } from "firebase/firestore";
import { IDocumentAction, IDocumentState, CollectionType } from "../types";
import { checkError } from "../helpers/checkError";

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
    const [isCancelled, setIsCancelled] = useState(false)


    const ref = collection(db, _collection)


    //add a document 
    const addDocument = async (doc: T) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const createdAt = timeStamp.fromDate(new Date())
            await addDoc(ref, { ...doc, createdAt })
            dispatch({ type: "ADD_DOCUMENT" })

        } catch (error) {
            const message = checkError(error)
            dispatch({ type: 'SET_ERROR', payload: message })
        }
    }

    // update existing document
    const updateDocument = async (id: string, updates: T) => {
        const documentRef = doc(ref, id)
        dispatch({ type: 'IS_PENDING' })
        debugger
        try {
            await setDoc(documentRef, updates)
            dispatch({ type: "UPDATED_DOCUMENT" })
        } catch (error) {
            const message = checkError(error)
            dispatch({ type: 'SET_ERROR', payload: message })
        }
    }

    //delete document
    const deleteDocument = async (id: string) => {
        const documentRef = doc(ref, id)
        dispatch({ type: 'IS_PENDING' })
        try {
            await deleteDoc(documentRef)

            dispatch({ type: "DELETE" })
        } catch (error) {
            const message = checkError(error)
            dispatch({ type: 'SET_ERROR', payload: message })
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, updateDocument, deleteDocument, response }
}