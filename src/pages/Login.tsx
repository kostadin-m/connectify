import { useState } from "react"
import { useNavigate } from "react-router-dom"

//custom hooks
import { useThemeContext, useLogin } from '@hooks'

//components
import FormInput from '@ui/FormInput'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login, isPending, error } = useLogin()

    const { theme } = useThemeContext()

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className={`form-box ${theme}`}>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <FormInput value={email} setValue={setEmail} label='Email' type='email' />
                <FormInput value={password} setValue={setPassword} label='Password' type='password' />
                {error && <p className="error">{error}</p>}
                {isPending && <div className="loader"></div>}
                <button className='form-btn form-btn1'>{isPending ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    )
}
