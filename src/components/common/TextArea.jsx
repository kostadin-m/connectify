import { memo } from "react";

function TextArea({ value, setValue, placeholder, theme }) {

    const autoResize = (e) => {
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
