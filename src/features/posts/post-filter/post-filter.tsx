

const fitlerList = ['ForYou', 'Friends']

import styles from './post-filter.module.css'
import { useThemeContext } from "@features/hooks"

interface Props {
    currentFilter: string
    changeFilter: (filter: string) => void
}

export default function PostFilter({ currentFilter, changeFilter }: Props) {

    const { theme } = useThemeContext()

    return (
        <div className={`${styles.postFilter} ${styles[theme]}`}>
            {fitlerList.map((filter) => (
                <button
                    className={`${styles.filterButton} ${filter === currentFilter ? styles.active : ''}`}
                    onClick={() => changeFilter(filter)}>
                    {filter}
                </button>
            ))}
        </div>
    )
}
