import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//custom hooks
import { useSignUp } from '../hooks/firebase-hooks/useSignUp'
import { useThemeContext } from '../hooks/view-hooks/useThemeContext'

//icons
import NoImage from '../assets/no_image.jpg'
import ChooseImage from '../assets/choose_image.svg'

//components
import ImageInput from '../components/common/ImageInput'
import ImagePreview from '../components/common/ImagePreview'
import FormInput from '../components/common/FormInput'

export default function SignUp() {
    const navigate = useNavigate()
    const [error, isPending, signUp] = useSignUp()
    const { theme } = useThemeContext()

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [image, setImage] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!image) return setImageError('Please submit an image')

        await signUp(firstName, lastName, location, email, password, image)

        if (!error) {
            navigate('/')
        }
    }

    return (
        <div className={`form-box ${theme}`}>
            <h2>Sign Up</h2>
            <form onSubmit={(submit)}>
                <label htmlFor='img' className={`form-img ${theme}`}>
                    <ImageInput setImage={setImage} setImageError={setImageError} />
                    {image ?
                        <ImagePreview image={image} style='image' />
                        :
                        <img className='image' src={NoImage} alt='user icon' />
                    }
                    <img className='choose-img' src={ChooseImage} alt='choose img' />
                </label>
                {imageError && <div className='error'>{imageError}</div>}

                <FormInput value={firstName} setValue={setFirstName} label='First name' />
                <FormInput value={lastName} setValue={setLastName} label='Last name' />
                <FormInput value={location} setValue={setLocation} label='Location - 𝘰𝘱𝘵𝘪𝘰𝘯𝘢𝘭' optional={true} />
                <FormInput value={email} setValue={setEmail} label='Email' type='email' />
                <FormInput value={password} setValue={setPassword} label='Password' type='password' />

                {error && <p className='error'>{error}</p>}
                {isPending && <div className='loader'></div>}
                <button className='form-btn'>{isPending ? 'Loading...' : 'Sign Up'}</button>
            </form>
        </div>
    )
}
