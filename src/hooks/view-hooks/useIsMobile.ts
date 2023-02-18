import { useEffect, useState } from "react"

export const useIsMobile = (width: number) => {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    // checking the current window size so we can conditionally render "FollowPeople" Component
    const handleResize = () => {
        if (window.innerWidth < width) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
    }, [window.innerWidth])

    return [isMobile] as const
}