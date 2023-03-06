interface Props {
    text: string
    theme: string
    disabled: boolean
    onClick: () => void
}

export default function Button({ disabled, text, theme, onClick }: Props) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`btn button ${theme}`}>
            <span>{text}</span>
        </button>
    )
}