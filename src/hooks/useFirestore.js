import { useState, useReducer, useEffect } from "react";
import { db, timeStamp } from "../firebase/config";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

let initialState = {
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
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

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)


    const ref = collection(db, collection)


    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }
    //add a document 
    const addDocument = async (doc) => {
        dispatchIfNotCancelled({ type: 'IS_PENDING' })
        try {
            const createdAt = timeStamp.fromDate(new Date())
            await addDoc(ref, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: "ADD_DOCUMENT" })

        } catch (error) {
            dispatchIfNotCancelled({ type: 'SET_ERROR', payload: error })
        }
    }

    // update existing document
    const updateDocument = async (id, updates) => {
        const doc = doc(db, collection, id)
        dispatchIfNotCancelled({ type: 'IS_PENDING' })
        try {
            await updateDoc(doc, updates)
            dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT" })

            return updatedDocument
        } catch (error) {
            dispatchIfNotCancelled({ type: 'SET_ERROR', payload: error })
        }

    }

    //delete document
    const deleteDocument = async (id) => {
        const doc = doc(db, collection, id)
        dispatchIfNotCancelled({ type: 'IS_PENDING' })
        try {
            await deleteDoc(ref)

            dispatchIfNotCancelled({ type: "DELETE" })
        } catch (error) {
            dispatchIfNotCancelled({ type: 'SET_ERROR', payload: error })
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, updateDocument, deleteDocument, response }
}