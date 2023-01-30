import { useState } from 'react'
import { useThemeContext } from '../../hooks/useThemeContext'

//styles
import styles from './SignUpForm.module.css'

//icons
import NoImage from '../../assets/no_image.jpg'
import ChooseImage from '../../assets/choose_image.svg'

//components
import FormInput from '../common/FormInput'
import ImageInput from '../common/ImageInput'
import ImagePreview from '../common/ImagePreview'

export default function SignUpForm({ action, error, pending }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState(null)

    const { theme } = useThemeContext()

    return (
        <form onSubmit={(e) => action(e, { firstName, lastName, location, email, password, image })}>
            <label htmlFor='img' className={`${styles.img} ${styles[theme]}`}>
                <ImageInput setImage={setImage} setImageError={setImageError} />
                {image ?
                    <ImagePreview image={image} style={styles.image} loadingImage={NoImage} />
                    :
                    <img className={styles.image} src={NoImage} alt='user icon' />
                }
                <img className={styles.chooseImg} src={ChooseImage} alt='choose img' />
            </label>
            {imageError && <div className='error'>{imageError}</div>}

            <FormInput value={firstName} setValue={setFirstName} label='First name' />
            <FormInput value={lastName} setValue={setLastName} label='Last name' />
            <FormInput value={location} setValue={setLocation} label='Location - 𝘰𝘱𝘵𝘪𝘰𝘯𝘢𝘭' optional={true} />
            <FormInput value={email} setValue={setEmail} label='Email' type='email' />
            <FormInput value={password} setValue={setPassword} label='Password' type='password' />

            {error && <p className='error'>{error}</p>}

            <button className='form-btn'>{pending ? 'Loading...' : 'Sign Up'}</button>
        </form>
    )
}
