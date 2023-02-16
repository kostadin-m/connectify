import { memo } from "react"

interface Props {
    text: string
    theme: string
    disabled: boolean
    onClick: () => void
}

function Button({ disabled, text, theme, onClick }: Props) {
    return (
        <button disabled={disabled} onClick={onClick} className={`btn ${theme}`}>
            <span>{text}</span>
        </button>
    )
}
export default memo(Button)