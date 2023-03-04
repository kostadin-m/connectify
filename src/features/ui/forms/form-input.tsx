import React from "react"
import { memo } from "react"

import styles from './forms.module.css'

//custom hooks
import { useThemeContext } from "@hooks"

interface Props {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    label: string
    type?: string
    optional?: boolean

}

function Input({ value, setValue, label, type, optional = false }: Props) {
    const { theme } = useThemeContext()
    return (
        <div className={`${styles.input} ${styles[theme]}`}>
            <label>{label}
                <input
                    required={optional ? false : true}
                    type={!type ? 'text' : type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
        </div>
    )
}
export default memo(Input)
