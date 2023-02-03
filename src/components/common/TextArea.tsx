import { memo, Dispatch, SetStateAction } from "react";


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
            className={`textarea ${theme}`}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}
export default memo(TextArea)
