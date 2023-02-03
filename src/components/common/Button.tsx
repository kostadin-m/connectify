import { memo } from "react"

interface Props {
    text: string
    theme: string
    onClick: () => void
}

function Button({ text, theme, onClick }: Props) {
    return (
        <button onClick={onClick} className={`btn ${theme}`}>
            <span>{text}</span>
        </button>
    )
}
export default memo(Button)