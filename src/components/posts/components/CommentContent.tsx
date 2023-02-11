

import { memo } from 'react'
import { useDocument } from '../../../hooks/firebase-hooks/useDocument'
import { CommentObject, UserObject } from '../../../types'
import { formatDate } from '../../../helpers/formatDate'
import styles from '../Post.module.css'

interface CommentContentProps {
    comment: CommentObject
    theme: string
}

function CommentContent({ comment, theme }: CommentContentProps) {
    const { document, error, isPending } = useDocument<UserObject>('users', comment.creatorID)

    return (
        <>
            {isPending && <div>Loading...</div>}
            {error && <p className='error'>{error}</p>}
            {document && <div className={`${styles.comment} ${styles[theme]}`}>
                <img className='profile-image' src={document.photoURL} alt='user icon' />
                <div className={styles.commentContent}>
                    <a href={`/${document.id}`}>{document.displayName}</a>
                    <p>{comment.commentContent}</p>
                </div>
                <p>{formatDate(comment.createdAt)}</p>
            </div>}
        </>
    )
}

export default memo(CommentContent)