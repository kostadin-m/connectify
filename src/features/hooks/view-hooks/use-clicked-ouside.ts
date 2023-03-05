import { useEffect, useRef, SetStateAction } from 'react';

export default function useClickedOutside(
    setIsVissible: React.Dispatch<SetStateAction<boolean>>,) {
    const ref = useRef<HTMLDivElement>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (!ref.current || ref.current.contains(event!.target as Node)) return

        setIsVissible(false)
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    return { ref };
}
