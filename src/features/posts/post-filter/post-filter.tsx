

const fitlerList = ['ForYou', 'Friends']

import styles from './post-filter.module.css'

interface Props {
	currentFilter: string
	changeFilter: (filter: string) => void
	theme: string
}

export default function PostFilter({ currentFilter, changeFilter, theme }: Props) {
	return (
		<div className={`${styles.postFilter} ${styles[theme]}`}>
			{fitlerList.map((filter) => (
				<button key={filter}
					className={`${styles.filterButton} ${filter === currentFilter ? styles.active : ''}`}
					onClick={() => changeFilter(filter)}>
					{filter}
				</button>
			))}
		</div>
	)
}
