import { useEffect, useState } from "react"

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    // checking the current window size so we can conditionally render "FollowPeople" Component
    const handleResize = () => {
        if (window.innerWidth < 1250) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    return [isMobile] as const
}