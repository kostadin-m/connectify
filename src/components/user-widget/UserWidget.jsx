import { useThemeContext } from '../../hooks/useThemeContext'

import Location from '../../assets/location_icon.svg'
import Likes from '../../assets/liked_icon.svg'

import Test from '../../assets/test.jpg'

import styles from './UserWidget.module.css'

export default function UserWidget() {
    const { theme } = useThemeContext()


    return (
        <div className={`${styles.widgetBox} ${styles[theme]}`}>
            <div className={styles.user}>
                <img src={Test} alt='profilepic' />
                <div className={`${styles.name} ${styles[theme]}`}>
                    <h3>Kostadin Madjerski</h3>
                    <p className={styles.friends}>1 friend</p>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={`${styles.stats} ${styles[theme]}`}>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={Location} alt='location icon' />
                    <p>Sofia, Bulgaria</p>
                </div>
                <div className={`${styles.stat} ${styles[theme]}`}>
                    <img src={Likes} alt='location icon' />
                    <p>54</p>
                </div>
            </div>
        </div>
    )
}
