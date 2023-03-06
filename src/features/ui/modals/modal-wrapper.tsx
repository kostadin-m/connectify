import { useEffect } from "react"
import ReactDOM from "react-dom"

import styles from './modal-wrapper.module.css'
import { CloseIcon } from "@assets"

interface Props {
  children: React.ReactNode
  theme: string
  title: string
  closeModal: () => void
}

export default function ModalWrapper({ children, theme, title, closeModal }: Props) {
  useEffect(() => {
    document.body.classList.add('active-modal')

    return () => { document.body.classList.remove('active-modal') }
  }, [])

  return ReactDOM.createPortal(
    <div data-testid='modal' className={styles.modal}>
      <div className={styles.overlay}>
        <div className={`${styles.modalContent} ${styles[theme]}`}>
          <h2>{title}</h2>
          {children}
          <img className={`${styles.closeModal} ${styles[theme]}`} onClick={() => closeModal()} src={CloseIcon} />
        </div>
      </div>
    </div>, document.getElementById('root')!
  );
}
