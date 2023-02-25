import { useThemeContext } from "@hooks"
import FormWrapper from "@ui/FormWrapper"


export default function NotFound() {

    const { theme } = useThemeContext()
    return (
        <FormWrapper theme={theme} title='Page Not Found'>
        </FormWrapper>
    )
}
