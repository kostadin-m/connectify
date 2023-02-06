//icons
import Location from '../../assets/location_icon.svg'
import Likes from '../../assets/liked_icon.svg'

//custom hooks
import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'
import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'

//styles
import styles from './UserWidget.module.css'

export default function UserWidget() {
    const { theme } = useThemeContext()
    const { user } = useAuthContext()

    return (
        <div className={`${styles.widgetBox} ${styles[theme]}`}>
            <div className={styles.user}>
                <img src={user?.photoURL!} alt='profilepic' />
                <div className={`${styles.name} ${styles[theme]}`}>
                    <h3>{user?.displayName}</h3>
                    <p className={styles.friends}>{user?.friends?.length || 0} friends</p>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={`${styles.stats} ${styles[theme]}`}>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={Location} alt='location icon' />
                    <p>{user?.location}</p>
                </div>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={Likes} alt='location icon' />
                    <p>54</p>
                </div>
            </div>
        </div>
    )
}
