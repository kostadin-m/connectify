import { useEffect, useState } from 'react'
//icons
import { LocationIcon, LikesIcon } from '@assets'

//custom hooks
import { useThemeContext, useCollection, useAuthContext } from '@features/hooks'

//styles

import styles from './user-widget.module.css'

//types
import { PostDocument, UserDocument, UserObject } from '../../../types'

//components
import { UserActionButton } from '@features/ui'

interface UserWidgetProps {
    user: UserObject | UserDocument
}

export default function UserWidget({ user }: UserWidgetProps) {
    const [totalLikes, setTotalLikes] = useState(0)

    const { document, error, isPending } = useCollection<PostDocument>('posts', ['creatorID', '==', user.id])
    const { theme } = useThemeContext()
    const { user: currentUser } = useAuthContext()

    useEffect(() => {
        setTotalLikes(0)
        if (!document) return

        document.forEach(post => setTotalLikes((prevLikes) => prevLikes + post.likes.length))
    }, [document])

    if (isPending) return (<div className='loader'></div>)

    return (
        <div className={`${styles.widgetBox} ${styles[theme]}`}>
            <div className={styles.user}>
                <img src={user?.photoURL!} alt='profilepic' />
                <div className={`${styles.name} ${styles[theme]}`}>
                    <h3>{user?.displayName}</h3>
                    <p className={styles.friends}>{user?.friends?.length} friends</p>
                </div>
                {currentUser?.id !== user.id && <div className={`${styles.buttons} ${styles[theme]}`}>
                    <UserActionButton friend={user} />
                </div>}
            </div>
            <hr className={styles.hr} />
            <div className={`${styles.stats} ${styles[theme]}`}>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={LocationIcon} alt='location icon' />
                    <p>{user.location?.length > 0 ? user.location : 'Not specified'}</p>
                </div>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={LikesIcon} alt='location icon' />
                    {document && <p>{totalLikes} likes</p>}
                    {!document && !error && <p>Loading...</p>}
                    {error && <p className='error'>{error}</p>}
                </div>
            </div>
        </div>
    )
}
