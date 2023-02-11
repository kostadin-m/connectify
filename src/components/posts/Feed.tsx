//components
import { useCollection } from '../../hooks/firebase-hooks/useCollection'
import { PostDocument, PostObject } from '../../types'
import Post from './components/Post'

interface Props {
    id?: string | null
}

export default function Feed({ id }: Props) {
    const { document: posts, isPending, error } = useCollection<PostDocument>('posts', id ? ['creatorID', '==', id] : null)
    return (
        <div className='feed'>
            {posts && posts.length === 0 ? <h1 className='error'>This user has no posts</h1> : posts && posts.map(post => (<Post post={post} />))}
        </div>
    )
}
