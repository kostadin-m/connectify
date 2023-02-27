//components
import { useCollection } from '@hooks'
import { PostDocument } from '@types'
import Post from './components/Post'

interface Props {
    id?: string | null
}

export default function Feed({ id }: Props) {
    const { document: posts, isPending, error } = useCollection<PostDocument>('posts', id ? ['creatorID', '==', id] : null, ['createdAt', 'desc'])


    if (isPending) return (<div data-testid='loader' className='loader'></div>)

    return (
        <div className='feed'>
            {error && <p className='error'>{error}</p>}
            {posts && posts.length === 0 ?
                <h1>No posts here!</h1> :
                posts && posts.map((post) => (<Post key={post.id} post={post} />))}
        </div>
    )
}
