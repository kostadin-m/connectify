import { useReducer, useEffect, useRef } from "react"
import { db } from "../../firebase/config"
import { collection, onSnapshot, query, where } from "firebase/firestore"

import { ICollectionState, ICollectionAction, CollectionType } from "../../types"

const initialState = { document: null, error: null, isPending: false }

const collectionReducer = <T extends CollectionType>(state: ICollectionState<T>, action: ICollectionAction<T>) => {
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

export const useCollection = <T extends CollectionType>(_collection: string, _query?: any[] | null): ICollectionState<T> => {
    const [state, dispatch] = useReducer
        <React.Reducer<ICollectionState<T>, ICollectionAction<T>>>
        (collectionReducer, initialState)

    let queryRef = useRef(_query)

    //comparing the two arrays so we can enter the useEffect if there is a change in the inside array when using the documentID query!
    if (queryRef.current && _query && Array.isArray(queryRef.current[2]) && Array.isArray(_query[2])) {
        if (queryRef.current[2].length !== _query[2].length) {
            queryRef.current = _query
        }
    }

    useEffect(() => {
        let ref = queryRef.current ?
            query(collection(db, _collection), where(queryRef.current[0], queryRef.current[1], queryRef.current[2])) :
            collection(db, _collection)

        const unsub = onSnapshot(ref, (snapshot) => {
            dispatch({ type: "IS_PENDING" })
            //Get The Data from the Collection
            let data: T[] = []
            snapshot.docs.forEach(doc => {
                const id = doc.id
                data.push({ ...doc.data(), id } as T)
            })
            //update state
            dispatch({ type: 'ADD_DOCUMENTS', payload: data })

        }, (error) => {

            dispatch({ type: "ERROR", payload: error.message })

        })

        return () => unsub()
    }, [_collection, queryRef.current])
    return { ...state }
}
