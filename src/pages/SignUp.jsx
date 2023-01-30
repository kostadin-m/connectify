import { useSignUp } from '../hooks/useSignUp'
import { useThemeContext } from '../hooks/useThemeContext'
import { useNavigate } from 'react-router-dom'

//components
import SignUpForm from '../components/sign-up-form/SignUpForm'

export default function SignUp() {
    const navigate = useNavigate()
    const [isPending, error, signUp] = useSignUp()
    const { theme } = useThemeContext()

    const action = (e, doc) => {
        e.preventDefault()
    }

    return (
        <div className={`form-box ${theme}`}>
            <h2>Sign Up</h2>
            <SignUpForm pending={isPending} error={error} action={action} />
        </div >
    )
}
