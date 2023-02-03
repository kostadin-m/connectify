import React, { useState } from "react"
import { useThemeContext } from "../hooks/useThemeContext"

//components
import FormInput from '../components/common/FormInput'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { theme } = useThemeContext()

    return (
        <div className={`form-box ${theme}`}>
            <h2>Login</h2>
            <form>
                <FormInput value={email} setValue={setEmail} label='Email' type='email' />
                <FormInput value={password} setValue={setPassword} label='Password' type='password' />
                <button className='form-btn form-btn1'>Login</button>
            </form>
        </div>
    )
}
