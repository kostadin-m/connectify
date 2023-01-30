import { useThemeContext } from "../hooks/useThemeContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react"


//icons
import NoImage from '../assets/no_image.jpg'
import ChooseImage from '../assets/choose_image.svg'

//components
import ImagePreview from "../components/common/ImagePreview"
import ImageInput from "../components/common/ImageInput"
import FormInput from '../components/common/FormInput'

//styles
import styles from '../components/sign-up-form/SignUpForm.module.css'


export default function EditProfile() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState(null)

    const user = useAuthContext()
    const { theme } = useThemeContext()



    return (
        <div className={`form-box ${theme}`}>
            <h2>Edit Profile</h2>
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

                <button className='form-btn'>Edit Profile</button>
            </form>
        </div>
    )
}
