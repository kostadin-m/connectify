import { useEffect } from "react"

import styles from './modal-wrapper.module.css'
import { CloseIcon } from "@assets"

interface Props {
  children: React.ReactNode
  theme: string
  title: string
  onModalClose: () => void
}

export default function ModalWrapper({ children, theme, title, onModalClose }: Props) {
  useEffect(() => {
    document.body.classList.add('active-modal')

    return () => { document.body.classList.remove('active-modal') }
  }, [])

  return (
    <div data-testid='modal' className={styles.modal}>
      <div className={styles.overlay}>
        <div className={`${styles.modalContent} ${styles[theme]}`}>
          <h2>{title}</h2>
          {children}
          <img className={`${styles.closeModal} ${styles[theme]}`} onClick={() => onModalClose()} src={CloseIcon} />
        </div>
      </div>
    </div>
  );
}
