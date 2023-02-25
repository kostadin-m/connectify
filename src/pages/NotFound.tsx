import { useThemeContext } from "@hooks"


export default function NotFound() {

    const { theme } = useThemeContext()
    return (
        <div className={`form-box ${theme}`}>
            <h2>Page not Found</h2>
        </div>
    )
}
