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
            {posts && posts.map(post => (<Post post={post} />))}
        </div>
    )
}
