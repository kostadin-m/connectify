import { Suspense, memo, useState } from 'react'

//hooks
import { useCollection, useThemeContext } from '@features/hooks'

//types
import { PostDocument } from '@types'

//styles
import styles from './post.module.css'

//components
import Post from './post'
import PostFilter from '@features/posts/post-filter/post-filter'
import { useFitlerPosts } from '@features/posts/hooks/use-filter-posts'
import { Loader } from '@features/ui'

interface Props {
	id?: string | null
}

function Feed({ id }: Props) {
	const collectionQuery = id ? ['creatorID', '==', id] : null

	const { document: posts, error } = useCollection<PostDocument>('posts', collectionQuery, ['createdAt', 'desc'])
	const [currentFilter, setCurrentFilter] = useState<string>('ForYou')
	const [filteredPosts] = useFitlerPosts(currentFilter, posts!)

	const { theme } = useThemeContext()

	const isHomePage = !id

	const changeFitler = (newFilter: string) => setCurrentFilter(newFilter)

	return (
		<div className={styles.feed}>
			{error && <p className='error'>{error}</p>}
			{isHomePage ? <PostFilter theme={theme} currentFilter={currentFilter} changeFilter={changeFitler} /> : null}
			<Suspense fallback={<Loader />}>
				{filteredPosts?.map((post) => (<Post key={post.id} post={post} />))}
			</Suspense>
			{filteredPosts?.length === 0 ? <h1>No posts here!</h1> : null}
		</div>
	)
}
export default memo(Feed)