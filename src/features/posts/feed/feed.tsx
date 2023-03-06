import { memo, useState } from 'react'

//hooks
import { useCollection } from '@features/hooks'

//types
import { PostDocument } from '@types'

//styles
import styles from './post.module.css'

//components
import Post from './post'
import PostFilter from '@features/posts/post-filter/post-filter'
import { filterPosts } from '@features/posts/post-filter/utils/filterPosts'

interface Props {
    id?: string | null
}

function Feed({ id }: Props) {
    const { document: posts, isPending, error } = useCollection<PostDocument>('posts', id ? ['creatorID', '==', id] : null, ['createdAt', 'desc'])
    const [currentFilter, setCurrentFilter] = useState<string>('ForYou')


    if (isPending) return (<div data-testid='loader' className='loader'></div>)

    const isHomePage = !id

    const changeFitler = (newFilter: string) => setCurrentFilter(newFilter)

    const filteredPosts = posts ? filterPosts(currentFilter, posts) : null

    return (
        <div className={styles.feed}>
            {error && <p className='error'>{error}</p>}
            {posts && isHomePage ? <PostFilter currentFilter={currentFilter} changeFilter={changeFitler} /> : null}
            {filteredPosts && filteredPosts.length === 0 ?
                <h1>No posts here!</h1> :
                filteredPosts && filteredPosts.map((post) => (<Post key={post.id} post={post} />))}
        </div>
    )
}
export default memo(Feed)