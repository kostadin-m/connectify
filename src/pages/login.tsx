import { Dispatch, SetStateAction, useState } from "react"

//custom hooks
import { useThemeContext, useLogin } from '@features/hooks'

//components
import { FormInput, FormWrapper } from "@features/ui"


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()

    const { theme } = useThemeContext()



    const handleChange = (setValue: Dispatch<SetStateAction<string>>, value: string) => {
        setValue(value)
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <FormWrapper title="Login" theme={theme}>
            <form onSubmit={submit}>
                <FormInput value={email} setValue={handleChange.bind(null, setEmail)} label='Email' type='email' />
                <FormInput value={password} setValue={handleChange.bind(null, setPassword)} label='Password' type='password' />
                {error && <p className="error">{error}</p>}
                {isPending && <div className="loader"></div>}
                <button
                    disabled={isPending}
                    className={`form-btn btn ${theme}`}>
                    {isPending ? 'Loading...' : 'Login'}
                </button>
            </form>
        </FormWrapper>
    )
}
