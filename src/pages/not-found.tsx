import { useThemeContext } from "@hooks"

import { FormWrapper } from "@features/ui"


export default function NotFound() {

    const { theme } = useThemeContext()
    return (
        <FormWrapper theme={theme} title='Page Not Found'>
        </FormWrapper>
    )
}
