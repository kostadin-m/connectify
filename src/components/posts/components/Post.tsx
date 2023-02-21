import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatDate } from '../../../helpers/formatDate'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


import { useThemeContext } from '../../../hooks/view-hooks/useThemeContext'
import { useDelayToUnmount } from '../../../hooks//view-hooks/useDelayToUnmount'

import { CSSClassesState, PostDocument, PostObject, UserDocument } from '../../../types'

//icons
import Location from '../../../assets/location_icon.svg'
import Like from '../../../assets/likes_icon.svg'
import Liked from '../../../assets/liked_icon.svg'
import CommentsIcon from '../../../assets/comments_icon.svg'

//components
import Comments from './Comments'

//styles
import styles from '../Post.module.css'
import { useDocument } from '../../../hooks/firebase-hooks/useDocument'
import { useAuthContext } from '../../../hooks/firebase-hooks/useAuthContext'
import { useFirestore } from '../../../hooks/firebase-hooks/useFirestore'

interface PostProps {
    post: PostDocument
}


export default function Post({ post }: PostProps) {
    const [commentsClass, setCommentsClass] = useState<CSSClassesState>('hidden')
    const [showComments, setShowComments] = useState(false)
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false)

    //custom hooks
    const { user } = useAuthContext()
    const { theme } = useThemeContext()
    const { toggleMount } = useDelayToUnmount(commentsClass, setShowComments, setCommentsClass)

    const { document: creatorData, error } = useDocument<UserDocument>('users', post.creatorID)
    const { updateDocument, response } = useFirestore<PostDocument>('posts')
    useEffect(() => {
        setLikedByCurrentUser(post.likes.includes(user?.id!))
    })

    if (error) return <p className='error'>{error}</p>

    const handleLike = async () => {
        const updatedLikes = likedByCurrentUser ?
            { likes: post.likes.filter((userLikedID) => userLikedID !== user?.id) } as PostDocument :
            { likes: [...post.likes, user?.id] } as PostDocument

        await updateDocument(post.id, updatedLikes)
    }

    return (
        <>
            {creatorData &&
                <div data-testid='post' className={`${styles.post} ${styles[theme]}`}>
                    <div className={styles.postTop}>
                        <div className={`${styles.user} ${styles[theme]}`}>
                            <img className='profile-image' src={creatorData.photoURL} alt='profile-image' />
                            <div className={styles.userInfo}>
                                <div className={styles.userNameLocation}>
                                    <Link to={`/profile/${creatorData.id}`} >{creatorData.displayName}</Link>
                                    <img src={Location} alt='location icon' />
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
                        <LazyLoadImage
                            alt='post image'
                            src={post.photoURL}
                            width='100%'
                            effect="blur"
                            placeholderSrc={post.photoURL}
                        />
                    </div>
                    <div className={`${styles.postBottom} ${styles[theme]}`}>
                        <img onClick={() => handleLike()}
                            className={`${styles.postImages} ${likedByCurrentUser ? styles.liked : undefined}`}
                            src={likedByCurrentUser ? Liked : Like} alt={likedByCurrentUser ? 'liked icon' : 'likes icon'} />
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
