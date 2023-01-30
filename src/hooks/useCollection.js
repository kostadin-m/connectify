import { useReducer, useEffect, useRef } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

const initialState = {
    document: null,
    isPending: false,
    error: null
}

const collectionReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { document: null, error: null, isPending: true }
        case "ADD_DOCUMENTS":
            return { document: action.payload, error: null, isPending: false }
        case "ERROR":
            return { document: null, error: action.payload, isPending: false }
        default:
            return state
    }
}

export const useCollection = (_collection, _query, _order) => {
    const [state, dispatch] = useReducer(collectionReducer, initialState)

    const q = useRef(_query).current
    const o = useRef(_order).current

    useEffect(() => {
        const ref = collection(db, _collection)

        if (query) {
            ref = query(ref, where(...q))
        }
        if (o) {
            ref - orderBy(ref, orderBy(...o))
        }
        const unsub = onSnapshot(ref, (snapshot) => {
            dispatch({ type: "IS_PENDING" })
            let result = []
            snapshot.docs.forEach(doc => {
                result.push({ ...doc.data(), id: doc.id })

            })
            //update state
            dispatch({ type: 'ADD_DOCUMENTS', payload: result })

        }, (error) => {

            dispatch({ type: "ERROR", payload: error.message })

        })

        return () => unsub()
    }, [collection, q, o])
    return { ...state }
}
