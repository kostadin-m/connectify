import { memo } from "react"
import { useThemeContext } from "../../hooks/useThemeContext"


function Input({ value, setValue, label, type, optional = false }) {
    const { theme } = useThemeContext()
    return (
        <div className={`input ${theme}`}>
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
