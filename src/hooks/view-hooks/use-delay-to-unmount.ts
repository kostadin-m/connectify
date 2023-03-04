import { SetStateAction, useRef } from "react"

import { CSSClassesState } from "../../types"

export const useDelayToUnmount = (
    elementClass: CSSClassesState,
    setShowElement: React.Dispatch<SetStateAction<boolean>>, setElementClass: React.Dispatch<SetStateAction<CSSClassesState>>) => {
    const timeoutRef = useRef<number | undefined>()

    function toggleMount() {
        if (elementClass === 'show') {
            timeoutRef.current = window.setTimeout(() => setShowElement(false), 580)
            return setElementClass('hidden')
        }
        setElementClass('show')
        setShowElement(true)
        window.clearTimeout(timeoutRef.current)
    }
    return { toggleMount }
}
