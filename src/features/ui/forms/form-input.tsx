import React, { useState } from "react"
import { memo } from "react"

import styles from './forms.module.css'

//custom hooks
import { useThemeContext } from "@features/hooks"

interface Props {
  value: string
  onChange: (value: string) => void
  label: string
  type?: string
  optional?: boolean

}

function Input({ value, onChange, label, type, optional = false }: Props) {
  const { theme } = useThemeContext()

  return (
    <div className={`${styles.inputContainer} ${styles[theme]}`}>
      <input
        className={styles.input}
        placeholder=" "
        required={optional ? false : true}
        type={!type ? 'text' : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label className={styles.label}>{label}</label>
    </div>
  )
}
export default memo(Input)
