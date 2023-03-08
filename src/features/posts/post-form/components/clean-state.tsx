import { CloseIcon } from "@assets"

import styles from '../post-form.module.css'
import { useThemeContext } from "@features/hooks"

interface CloseIconProps {
  onRemove: () => void
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed'
}

export default function CleanStateComponent({ onRemove, position = 'absolute' }: CloseIconProps) {
  const { theme } = useThemeContext()

  return <img
    onClick={() => onRemove()}
    style={{ position }}
    className={`${styles.remove} ${styles[theme]}`}
    src={CloseIcon}
    alt='close icon' />
}