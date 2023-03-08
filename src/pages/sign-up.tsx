import { Dispatch, SetStateAction, useState } from 'react'

//custom hooks
import { useSignUp, useThemeContext } from '@features/hooks'

//icons
import { NoImage, ChooseImage } from '@assets'

//components
import { ImageInput, ImagePreview, FormInput, FormWrapper } from '@features/ui'


export default function SignUp() {
    const [error, isPending, signUp] = useSignUp()
    const { theme } = useThemeContext()

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [image, setImage] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)

    const handleChange = (setValue: Dispatch<SetStateAction<string>>, value: string) => setValue(value)
    const changeImageError = (value: string | null) => setImageError(value)
    const changeImage = (value: File | null) => setImage(value)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!image) return setImageError('Please submit an image')

        await signUp(firstName, lastName, location, email, password, image)
    }

    return (
        <FormWrapper theme={theme} title='Sign Up'>
            <form onSubmit={(submit)}>
                <label htmlFor='img' className={`form-img ${theme}`}>
                    <ImageInput onImageChange={changeImage} onImageErrorChange={changeImageError} />
                    {image ?
                        <ImagePreview image={image} style='image' />
                        :
                        <img className='image' src={NoImage} alt='user icon' />
                    }
                    <img className='choose-img' src={ChooseImage} alt='choose img' />
                </label>
                {imageError && <div className='error'>{imageError}</div>}
                <FormInput value={firstName} onChange={handleChange.bind(null, setFirstName)} label='First name' />
                <FormInput value={lastName} onChange={handleChange.bind(null, setLastName)} label='Last name' />
                <FormInput value={location} onChange={handleChange.bind(null, setLocation)} label='Location - 𝘰𝘱𝘵𝘪𝘰𝘯𝘢𝘭' optional={true} />
                <FormInput value={email} onChange={handleChange.bind(null, setEmail)} label='Email' type='email' />
                <FormInput value={password} onChange={handleChange.bind(null, setPassword)} label='Password' type='password' />
                {error && <p className='error'>{error}</p>}
                {isPending && <div className='loader'></div>}
                <button
                    disabled={isPending}
                    className={`form-btn btn ${theme}`}>
                    {isPending ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
        </FormWrapper>
    )
}
