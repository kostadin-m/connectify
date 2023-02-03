import React from "react"
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


export default function EditProfile() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [image, setImage] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)

    const user = useAuthContext()
    const { theme } = useThemeContext()

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!image) {
            setImageError('Please choose an image file!')
        }

    }
    return (
        <div className={`form-box ${theme}`}>
            <h2>Edit Profile</h2>
            <form onSubmit={submit}>
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

                <button className='form-btn'>Edit Profile</button>
            </form>
        </div>
    )
}
