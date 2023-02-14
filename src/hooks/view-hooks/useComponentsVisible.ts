import { useState, useEffect, useRef, SetStateAction } from 'react';
import { CSSClassesState } from '../../types';

export default function useComponentVisible(
    initialIsVisible: boolean,
    setClass: React.Dispatch<SetStateAction<CSSClassesState>>,
    timeout: number) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>()


    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event!.target as Node)) {
            setClass('hidden')
            timeoutRef.current = window.setTimeout(() => setIsComponentVisible(false), timeout)

        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}
