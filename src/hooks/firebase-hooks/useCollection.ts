import { useReducer, useEffect, useRef } from "react"
import { db } from "../../firebase/config"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { CollectionType } from "../../types"
import { debug } from "console"



const initialState = { document: null, error: null, isPending: false }


interface ICollectionState<T extends CollectionType> {
    document: T[] | null
    error: string | null
    isPending: boolean

}

type ICollectionAction<T extends CollectionType> =
    { type: "IS_PENDING", payload?: null } |
    { type: "ADD_DOCUMENTS", payload: T[] | null } |
    { type: "ERROR", payload: string }


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

export const useCollection = <T extends CollectionType>(_collection: string, _query?: any[] | null, _order?: any[]): ICollectionState<T> => {
    const [state, dispatch] = useReducer
        <React.Reducer<ICollectionState<T>, ICollectionAction<T>>>
        (collectionReducer, initialState)

    let queryRef = useRef(_query)
    let orderRef = useRef(_order)

    //comparing the two arrays so we can enter the useEffect if there is a change in the inside array when using the documentID query!
    if (queryRef.current && _query && Array.isArray(queryRef.current[2]) && Array.isArray(_query[2])) {
        if (queryRef.current[2].length !== _query[2].length) {
            queryRef.current = _query
        }
    }
    //checking if the query string is the same
    if (queryRef.current && _query) {
        if (queryRef.current[2] !== _query[2]) {
            queryRef.current = _query
        }
    }


    useEffect(() => {
        dispatch({ type: "IS_PENDING" })
        let ref = query(collection(db, _collection))

        if (queryRef.current && orderRef.current) {
            ref = query(collection(db, _collection),
                where(queryRef.current[0], queryRef.current[1], queryRef.current[2]), orderBy(orderRef.current[0], orderRef.current[1]))

        } else if (!queryRef.current && orderRef.current) {
            ref = query(collection(db, _collection), orderBy(orderRef.current[0], orderRef.current[1]))
        } else if (!orderRef.current && queryRef.current) {
            ref = query(collection(db, _collection),
                where(queryRef.current[0], queryRef.current[1], queryRef.current[2]))
        }

        const unsub = onSnapshot(ref, (snapshot) => {
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
