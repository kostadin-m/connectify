import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

//helper
import { formatDate } from '../utils/format-date'

//custom hooks
import { useThemeContext, useDelayToUnmount, useDocument, useAuthContext, useFirestore } from '@hooks'

import { CSSClassesState, PostDocument, UserDocument } from '@types'

//icons
import { LocationIcon, LikesIcon, LikedIcon, CommentsIcon } from '@assets'


//components
import Comments from '@features/posts/comments/comments'

//styles
import styles from './post.module.css'


interface PostProps {
    post: PostDocument
}

export default function Post({ post }: PostProps) {
    const [commentsClass, setCommentsClass] = useState<CSSClassesState>('hidden')
    const [showComments, setShowComments] = useState(false)
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false)

    const { user } = useAuthContext()
    const { theme } = useThemeContext()
    const { toggleMount } = useDelayToUnmount(commentsClass, setShowComments, setCommentsClass)

    const { document: creatorData, error } = useDocument<UserDocument>('users', post.creatorID)
    const { updateDocument, response } = useFirestore<PostDocument>('posts')

    useEffect(() => setLikedByCurrentUser(post.likes.includes(user?.id!)))

    if (error) return <p className='error'>{error}</p>

    const handleLike = async () => {
        const updatedLikes = likedByCurrentUser ?
            { likes: post.likes.filter((userLikedID) => userLikedID !== user?.id) } as PostDocument :
            { likes: [...post.likes, user?.id] } as PostDocument
        await updateDocument(post.id, updatedLikes)

        setLikedByCurrentUser(true)
    }

    return (
        <>
            {creatorData &&
                <div data-testid='post' className={`${styles.post} ${styles[theme]}`}>
                    <div className={styles.postTop}>
                        <div className={`${styles.user} ${styles[theme]}`}>
                            <img loading='lazy' className='profile-image' src={creatorData.photoURL} alt='profile-image' />
                            <div className={styles.userInfo}>
                                <div className={styles.userNameLocation}>
                                    <Link to={`/profile/${creatorData.id}`} >{creatorData.displayName}</Link>
                                    <img src={LocationIcon} alt='location icon' />
                                    <p>{post.location}</p>
                                </div>
                                <div className={styles.timeAndLocation}>
                                    <p className={styles.timestamp}>{formatDate(post.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.postMiddle}>
                        <p className={`${styles.postText} ${styles[theme]}`}>{post.postTitle}</p>
                        <img
                            loading='lazy'
                            className={styles.postImage}
                            src={post.photoURL}
                            alt="post image" />
                    </div>
                    <div className={`${styles.postBottom} ${styles[theme]}`}>
                        <img onClick={() => handleLike()}
                            className={`${styles.postImages} ${likedByCurrentUser ? styles.liked : undefined}`}
                            src={likedByCurrentUser ? LikedIcon : LikesIcon} alt={likedByCurrentUser ? 'liked icon' : 'likes icon'} />
                        <p className={styles.likesCount}>{post.likes.length}</p>
                        <img onClick={toggleMount} className={styles.postImages} src={CommentsIcon} alt='comments icon' />
                        <p className={styles.likesCount}>{post.comments.length}</p>
                    </div>
                    {response.error && <p className='error'>{response.error}</p>}
                    {showComments && <Comments post={post} classname={commentsClass} theme={theme} />}
                </div>}
        </>
    )
}
