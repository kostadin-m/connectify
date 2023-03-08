import { CSSClassesState, PostDocument } from '@types'
import styles from '../post.module.css'

import React, { useEffect, useState } from 'react'
import { useAuthContext, useDelayToUnmount, useFirestore, useThemeContext } from '@features/hooks'
import { CommentsIcon, LikedIcon, LikesIcon } from '@assets'
import Comments from '@features/posts/comments/comments'

interface Props {
  post: PostDocument
}

export default function LikesAndCommentsIcons({ post }: Props) {
  const { user } = useAuthContext()
  const { theme } = useThemeContext()

  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false)
  const { updateDocument, response } = useFirestore<PostDocument>('posts')

  useEffect(() => {
    setLikedByCurrentUser(post.likes.includes(user?.id!))
  })

  const handleLike = async () => {
    const updatedLikes = likedByCurrentUser ?
      { likes: post.likes.filter((userLikedID) => userLikedID !== user?.id) } as PostDocument :
      { likes: [...post.likes, user?.id] } as PostDocument
    await updateDocument(post.id, updatedLikes)
  }

  const [showComments, setShowComments] = useState(false)
  const { toggleMount, elementClass: commentsClass } = useDelayToUnmount(setShowComments)

  return (
    <>
      {response.error ? <p>{response.error}</p> :
        <>
          <div className={`${styles.postBottom} ${styles[theme]}`}>
            {likedByCurrentUser ?
              <img onClick={() => handleLike()} className={`${styles.postImages} ${styles.liked}`} src={LikedIcon} alt='liked icon' />
              :
              <img onClick={() => handleLike()} className={styles.postImages} src={LikesIcon} alt='likes icon' />}
            <p className={styles.likesCount}>{post.likes.length}</p>

            <img onClick={toggleMount} className={styles.postImages} src={CommentsIcon} alt='comments icon' />
            <p className={styles.likesCount}>{post.comments.length}</p>
          </div>
          {showComments && <Comments classname={commentsClass} post={post} theme={theme} />}
        </>
      }
    </>
  )
}
