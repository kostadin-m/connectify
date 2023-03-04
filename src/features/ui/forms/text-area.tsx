import { memo, Dispatch, SetStateAction } from "react";

import styles from './forms.module.css'


interface Props {
    value: string
    setValue: Dispatch<SetStateAction<string>>
    placeholder: string
    theme: string
}

function TextArea({ value, setValue, placeholder, theme }: Props) {

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
            onChange={(e) => setValue(e.target.value)}
        />
    )
}
export default memo(TextArea)
