

import Accept from '../../../assets/accept_request.svg'
import Deny from '../../../assets/close_icon.svg'
import Test from '../../../assets/test.jpg'


import styles from '../Friends.module.css'

export default function FriendList({ theme }) {
    return (
        <div className={styles.listFriends}>
            <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
            <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
                       <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
            <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
            <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
                       <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
            <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
            <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
                       <div className={`${styles.friend} ${styles[theme]}`}>
                <img className='profile-image' src={Test} alt='profile picture' />
                <p className={styles.name}>Kostadin Atanasov Majerski</p>
                <div className={`${styles.buttons} ${styles[theme]}`}>
                    <img className={styles.button} src={Accept} alt='accept icon' />
                    <img className={styles.button} src={Deny} alt='accept icon' />
                </div>
            </div>
        </div>
    )
}
