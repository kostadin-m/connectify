import { useEffect } from "react"
import { Suggestion } from "react-places-autocomplete"

interface IAutoComplete {
    loading: boolean
    suggestions: readonly Suggestion[]
    adress: string
    children: React.ReactNode
    changeLocations: (suggesstions: readonly Suggestion[]) => void

}

export default function WithAutoComplete({ children, loading, suggestions, adress, changeLocations }: IAutoComplete) {
    useEffect(() => {
        if (!adress) return changeLocations([])
        changeLocations(suggestions)

        return () => { changeLocations([]) }
    }, [adress, loading])

    return (
        <>
            {children}
        </>
    )
}