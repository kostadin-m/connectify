import { Link } from 'react-router-dom'
import { useThemeContext } from '../../../hooks/useThemeContext'
import { useState } from 'react'

//icons
import Location from '../../../assets/location_icon.svg'
import Test from '../../../assets/test.jpg'
import Like from '../../../assets/likes_icon.svg'
import Liked from '../../../assets/liked_icon.svg'
import CommentsIcon from '../../../assets/comments_icon.svg'

//components
import Comments from './Comments'

//styles
import styles from '../Post.module.css'
import { useRef } from 'react'
import { CSSClassesState } from '../../../types'


export default function Post() {
    const [liked, setLiked] = useState(false)


    const [commentsClass, setCommentsClass] = useState<CSSClassesState>('hidden')
    const [showComments, setShowComments] = useState(false)
    const refTimer = useRef<number | null>(null)

    const toggleShowComments = () => {
        if (commentsClass === 'show') {
            refTimer.current = window.setTimeout(() => setShowComments(false), 580)
            setCommentsClass('hidden')
        } else {
            setCommentsClass('show')
            setShowComments(true)
            if (refTimer.current !== null) {
                window.clearTimeout(refTimer.current)
            }

        }
    }
    const { theme } = useThemeContext()

    return (
        <div className={`${styles.post} ${styles[theme]}`}>
            <div className={styles.postTop}>
                <div className={`${styles.user} ${styles[theme]}`}>
                    <img className='profile-image' src={Test} alt='' />
                    <div className={styles.userInfo}>
                        <Link to='/' >Kostadasdsaasddadasddin</Link>
                        <div className={styles.timeAndLocation}>
                            <p className={styles.timestamp}>22h ago</p>
                            <img src={Location} alt='location icon' />
                            <p>Sofia, Bulgaria</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.postMiddle}>
                <p className={`${styles.postText} ${styles[theme]}`}>dasdsadsadassdadasdas</p>
                <img src={Test} alt='post image' />
            </div>
            <div className={`${styles.postBottom} ${styles[theme]}`}>
                <img onClick={() => setLiked(!liked)}
                    className={`${styles.postImages} ${liked ? styles.liked : undefined}`}
                    src={liked ? Liked : Like} alt='likes icon' />
                <p className={styles.likesCount}>48</p>
                <img onClick={toggleShowComments} className={styles.postImages} src={CommentsIcon} alt='comments icon' />
                <p className={styles.likesCount}>2 comments</p>
            </div>
            {showComments && <Comments classname={commentsClass} theme={theme} />}
        </div>
    )
}
