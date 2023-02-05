import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { UserObject } from "../types";


export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('Context must be used inside a Context Provider')
    }


    return context
}