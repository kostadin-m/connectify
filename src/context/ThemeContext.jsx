import { createContext, useReducer } from "react";

export const ThemeContext = createContext()

export const themeRedcuer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_THEME":
            return { ...state, theme: action.payload }
        default: return state
    }
}

export const ThemeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeRedcuer,
        {
            theme: localStorage.getItem('theme'),
        })
    if (!state.theme) {
        localStorage.setItem('theme', 'light')
        dispatch({ type: "TOGGLE_THEME", payload: "light" })
    }

    const toggleTheme = () => {
        const payload = state.theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', payload)
        dispatch({ type: "TOGGLE_THEME", payload: payload })
    }

    return (
        <ThemeContext.Provider value={{ ...state, toggleTheme }
        }>
            {children}
        </ThemeContext.Provider >
    )
}