import { memo } from 'react'
import { formatDate } from '../../../helpers'

import { useDocument } from '@hooks'
import { CommentObject, UserObject } from '@types'

//styles
import styles from './Comments.module.css'

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
                    <a href={`/profile/${document.id}`}>{document.displayName}</a>
                    <p>{comment.commentContent}</p>
                </div>
                <p>{formatDate(comment.createdAt)}</p>
            </div>}
        </>
    )
}

export default memo(CommentContent)