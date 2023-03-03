import { createContext, useReducer } from "react";

//types
import { IContextProviderProps } from "@types";


interface IThemeState {
    theme: string
}

interface IThemeActions {
    type: 'TOGGLE_THEME'
    payload: 'light' | 'dark'
}


interface IThemeContext {
    theme: string
    toggleTheme: () => void
}


export const ThemeContext = createContext<IThemeContext | undefined>(undefined)

export function themeReducer(state: IThemeState, action: IThemeActions) {
    switch (action.type) {
        case "TOGGLE_THEME":
            return { ...state, theme: action.payload }
        default: return state
    }
}

export const ThemeContextProvider = ({ children }: IContextProviderProps) => {
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light')
    const [state, dispatch] = useReducer(themeReducer, { theme: localStorage.getItem('theme')! })

    const toggleTheme = () => {
        const payload = state.theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', payload)
        dispatch({ type: "TOGGLE_THEME", payload: payload })
    }

    return (
        <ThemeContext.Provider value={{ ...state, toggleTheme } as IThemeContext}>
            {children}
        </ThemeContext.Provider >
    )
}