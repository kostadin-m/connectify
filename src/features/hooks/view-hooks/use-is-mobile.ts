import { useEffect, useState } from "react"

export const useIsMobile = (width: number) => {
	const [isMobile, setIsMobile] = useState<boolean>(false)

	const handleResize = () => {
		setIsMobile(window.innerWidth < width ? true : false)
	}

	useEffect(() => {
		handleResize()
		window.addEventListener("resize", handleResize)
	}, [window.innerWidth])

	return [isMobile] as const
}