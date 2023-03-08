import { Suspense, memo } from 'react'
import { formatDate } from '../utils/format-date'

import { useDocument } from '@features/hooks'
import { CommentObject, UserObject } from '@types'

//styles
import styles from './comments.module.css'

interface CommentContentProps {
    comment: CommentObject
    theme: string
}

function CommentContent({ comment, theme }: CommentContentProps) {
    const { document, error } = useDocument<UserObject>('users', comment.creatorID)

    return (
        <>
            {error && <p className='error'>{error}</p>}
            <Suspense fallback={<div>Loading...</div>}>
                {document ?
                    <div className={`${styles.comment} ${styles[theme]}`}>
                        <img className='profile-image' src={document.photoURL} alt='user icon' />
                        <div className={styles.commentContent}>
                            <a href={`/profile/${document.id}`}>{document.displayName}</a>
                            <p>{comment.commentContent}</p>
                        </div>
                        <p>{formatDate(comment.createdAt)}</p>
                    </div> : null}
            </Suspense>
        </>
    )
}

export default memo(CommentContent)