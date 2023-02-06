import { useState } from "react"
import { useThemeContext } from '../hooks/view-hooks/useThemeContext'

//components
import FormInput from '../components/common/FormInput'
import { useLogin } from "../hooks/firebase-hooks/useLogin"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login, isPending, error } = useLogin()

    const { theme } = useThemeContext()

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
        navigate('/')
    }

    return (
        <div className={`form-box ${theme}`}>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <FormInput value={email} setValue={setEmail} label='Email' type='email' />
                <FormInput value={password} setValue={setPassword} label='Password' type='password' />
                {error && <p className="error">{error}</p>}
                <button className='form-btn form-btn1'>{isPending ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    )
}
