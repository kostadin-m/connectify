import { useState } from "react"

//custom hooks
import { useThemeContext, useLogin } from '@hooks'

//components
import { Button, FormInput, FormWrapper } from "@features/ui"


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()

    const { theme } = useThemeContext()

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <FormWrapper title="Login" theme={theme}>
            <form onSubmit={submit}>
                <FormInput value={email} setValue={setEmail} label='Email' type='email' />
                <FormInput value={password} setValue={setPassword} label='Password' type='password' />
                {error && <p className="error">{error}</p>}
                {isPending && <div className="loader"></div>}
                <button
                    disabled={isPending}
                    className={`form-btn ${theme}`}>
                    {isPending ? 'Loading...' : 'Login'}
                </button>
            </form>
        </FormWrapper>
    )
}
