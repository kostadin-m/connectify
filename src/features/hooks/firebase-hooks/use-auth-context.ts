import { AuthContext } from "@features/context/auth-context";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Context must be used inside a Context Provider')

    return context
}