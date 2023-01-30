import { memo } from "react"

function Button({ text, theme, onClick }) {
    return (
        <button onClick={onClick} className={`btn ${theme}`}>
            <span>{text}</span>
        </button>
    )
}
export default memo(Button)