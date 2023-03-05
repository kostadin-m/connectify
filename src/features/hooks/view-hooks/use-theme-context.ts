import { ThemeContext } from "@features/context/theme-context";
import { useContext } from "react";


export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (!context) throw new Error('Context must be used inside a Context Provider')

    return context
}