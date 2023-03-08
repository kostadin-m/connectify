import { ReactNode, useEffect, useRef } from "react"


interface Props {
    onAlert: () => void
    children: ReactNode
}

export default function AlertClickedOutside({ onAlert, children }: Props) {
    const handleClickOutside = (event: MouseEvent) => {
        if (!ref.current || ref.current.contains(event!.target as Node)) return

        timeoutRef.current = window.setTimeout(() => onAlert(), 20)
    };
    const ref = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>()

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, [document.body.classList.length]);

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}
