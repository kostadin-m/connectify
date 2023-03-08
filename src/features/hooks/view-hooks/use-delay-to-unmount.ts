import { SetStateAction, useRef, useState } from "react"

import { CSSClassesState } from "@types"

export const useDelayToUnmount = (
  setShowElement: React.Dispatch<SetStateAction<boolean>>) => {
  const timeoutRef = useRef<number | undefined>()

  const [elementClass, setElementClass] = useState<CSSClassesState>('hidden')

  function toggleMount() {
    if (elementClass === 'show') {
      timeoutRef.current = window.setTimeout(() => setShowElement(false), 580)

      return setElementClass('hidden')
    }
    setElementClass('show')
    setShowElement(true)
    window.clearTimeout(timeoutRef.current)
  }
  return { toggleMount, elementClass }
}
