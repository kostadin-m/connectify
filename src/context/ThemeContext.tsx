import React from 'react'
import { createContext, useReducer } from "react";

//interfaces
import { IContextProviderProps, IThemeState, IThemeActions, IThemeContext } from "../types";


export const ThemeContext = createContext<IThemeContext | undefined>(undefined)

export function themeReducer(state: IThemeState, action: IThemeActions) {
    debugger
    switch (action.type) {
        case "TOGGLE_THEME":
            return { ...state, theme: action.payload }
        default: return state
    }
}

export const ThemeContextProvider = ({ children }: IContextProviderProps) => {
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'light')
    }
    const initialState: IThemeState = { theme: localStorage.getItem('theme')! }

    const [state, dispatch] = useReducer(themeReducer, initialState)

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