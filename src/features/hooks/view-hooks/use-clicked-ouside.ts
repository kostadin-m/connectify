import { useEffect, useRef, SetStateAction } from 'react';

export default function useClickedOutside(
    setIsVissible: React.Dispatch<SetStateAction<boolean>>,) {
    const ref = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>()

    const handleClickOutside = (event: MouseEvent) => {
        if (!ref.current || ref.current.contains(event!.target as Node)) return

        timeoutRef.current = window.setTimeout(() => setIsVissible(false), 20)
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    return { ref };
}
