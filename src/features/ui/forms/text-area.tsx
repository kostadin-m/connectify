import { memo, Dispatch, SetStateAction } from "react";

import styles from './forms.module.css'


interface Props {
    value: string
    onChange: (value: string) => void
    placeholder: string
    theme: string
}

function TextArea({ value, onChange, placeholder, theme }: Props) {

    const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    return (
        <textarea
            onInput={autoResize}
            value={value}
            placeholder={placeholder}
            className={`${styles.textarea} ${styles[theme]}`}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}
export default memo(TextArea)
