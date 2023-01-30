import { useEffect } from "react"
import ReactDOM from 'react-dom'

//icons
import Close from '../../../assets/close_icon.svg'

//styles
import styles from './ActionModal.module.css'

export default function FriendsActionModal({ setActionModal, theme, user }) {

    const closeModal = () => setActionModal(false)

    useEffect(() => {
        document.body.classList.add('active-modal')

        return () => document.body.classList.remove('active-modal')
    }, [])

    return ReactDOM.createPortal(
        <div className={`modal`}>
            <div className="overlay">
                <div className={`modal-content ${theme}`}>
                    <h2>Are you sure you want to remove Udsadasdsadasdasdasdasdasdasdasser from your friends list?</h2>
                    <p className={`${styles.warning} ${styles[theme]}`}>If you remove your friend you can add them again!</p>
                    <div className={styles.buttonsContainer}>
                        <button className={`${styles.button} ${styles[theme]}`}>Yes</button>
                        <button onClick={closeModal} className={`${styles.button} ${styles[theme]}`}>No</button>
                    </div>
                    <img className={`close-modal ${theme}`} onClick={closeModal}
                        src={Close} alt='closeIcon' />
                </div>
            </div>
        </div>, document.getElementById('root')
    )

}