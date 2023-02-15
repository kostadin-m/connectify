//components
import { useCollection } from '../../hooks/firebase-hooks/useCollection'
import { PostDocument, PostObject } from '../../types'
import Post from './components/Post'

interface Props {
    id?: string | null
}

export default function Feed({ id }: Props) {
    const { document: posts, isPending, error } = useCollection<PostDocument>('posts', id ? ['creatorID', '==', id] : null)

    if (isPending) return (<div className='loader'></div>)
    return (
        <div className='feed'>
            {error && <p className='error'>{error}</p>}
            {posts && posts.length === 0 ?
                <h1 className='error'>No posts here!</h1> :
                posts && posts.map(post => (<Post key={post.id} post={post} />))}
        </div>
    )
}
