import { useEffect } from "react"
import { Suggestion } from "react-places-autocomplete"

interface IAutoComplete {
  loading: boolean
  suggestions: readonly Suggestion[]
  adress: string
  children: React.ReactNode
  onLocationListChange: (suggesstions: readonly Suggestion[]) => void

}

export default function WithAutoComplete({ children, loading, suggestions, adress, onLocationListChange }: IAutoComplete) {
  useEffect(() => {
    if (!adress) return onLocationListChange([])
    onLocationListChange(suggestions)

    return () => { onLocationListChange([]) }
  }, [adress, loading])

  return (
    <>
      {children}
    </>
  )
}