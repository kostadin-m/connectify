//icons
import Location from '../../assets/location_icon.svg'
import Likes from '../../assets/liked_icon.svg'

//custom hooks
import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'

//styles
import styles from './UserWidget.module.css'
import { PostDocument, UserDocument, UserObject } from '../../types'
import { useCollection } from '../../hooks/firebase-hooks/useCollection'
import { useEffect, useState } from 'react'
import UserActionButton from '../ui/UserActionButton'
import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'

interface UserWidgetProps {
    user: UserObject | UserDocument
}

export default function UserWidget({ user }: UserWidgetProps) {
    const { document, error, isPending } = useCollection<PostDocument>('posts', ['creatorID', '==', user.id])
    const [totalLikes, setTotalLikes] = useState(0)


    const { theme } = useThemeContext()
    const { user: currentUser } = useAuthContext()

    useEffect(() => {
        setTotalLikes(0)
        if (document) {
            document.forEach(post => setTotalLikes((prevLikes) => prevLikes + post.likes.length))
        }
    }, [document])

    return (
        <div className={`${styles.widgetBox} ${styles[theme]}`}>
            <div className={styles.user}>
                <img src={user?.photoURL!} alt='profilepic' />
                <div className={`${styles.name} ${styles[theme]}`}>
                    <h3>{user?.displayName}</h3>
                    <p className={styles.friends}>{user?.friends?.length} friends</p>
                </div>
                {currentUser?.id !== user.id && < UserActionButton friend={user} />}
            </div>
            <hr className={styles.hr} />
            <div className={`${styles.stats} ${styles[theme]}`}>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={Location} alt='location icon' />
                    <p>{user.location.length > 0 ? user.location : 'Not specified'}</p>
                </div>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={Likes} alt='location icon' />
                    {document && <p>{totalLikes} likes</p>}
                    {!document && !error && <p>Loading...</p>}
                    {error && <p className='error'>{error}</p>}
                </div>
            </div>
        </div>
    )
}
