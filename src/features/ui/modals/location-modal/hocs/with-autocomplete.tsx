import { useEffect } from "react"
import { Suggestion } from "react-places-autocomplete"

interface IAutoComplete {
    loading: boolean
    suggestions: readonly Suggestion[]
    adress: string
    children: React.ReactNode
    setLocations: React.Dispatch<React.SetStateAction<readonly Suggestion[]>>

}

export default function WithAutoComplete({ children, loading, suggestions, adress, setLocations }: IAutoComplete) {
    useEffect(() => {
        if (!adress) return setLocations([])
        setLocations(suggestions)
    }, [adress, loading])

    return (
        <>
            {children}
        </>
    )
}