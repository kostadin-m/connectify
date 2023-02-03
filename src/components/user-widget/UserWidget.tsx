import { useThemeContext } from '../../hooks/useThemeContext'

import Location from '../../assets/location_icon.svg'
import Likes from '../../assets/liked_icon.svg'

import Test from '../../assets/test.jpg'

import styles from './UserWidget.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function UserWidget() {
    const { theme } = useThemeContext()
    const { user } = useAuthContext()

    console.log(user)


    return (
        <div className={`${styles.widgetBox} ${styles[theme]}`}>
            <div className={styles.user}>
                <img src={user?.photoURL!} alt='profilepic' />
                <div className={`${styles.name} ${styles[theme]}`}>
                    <h3>{user?.displayName}</h3>
                    <p className={styles.friends}>{user?.friends.length} friends</p>
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
