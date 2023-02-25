import { useState } from "react"

//icons
import { ChooseImage } from '@assets'

//components
import ImagePreview from "@ui/ImagePreview"
import ImageInput from "@ui/ImageInput"
import FormInput from '@ui/FormInput'

//custom hooks
import { useThemeContext, useAuthContext, useEditUser } from "@hooks"
import FormWrapper from "@ui/FormWrapper"


export default function EditProfile() {
    const { user } = useAuthContext()
    const { theme } = useThemeContext()
    const { isPending, editUser, error } = useEditUser()

    const [firstName, setFirstName] = useState<string>(user?.displayName?.split(' ')[0]!)
    const [lastName, setLastName] = useState<string>(user?.displayName?.split(' ')[1]!)
    const [location, setLocation] = useState<string>(user?.location!)
    const [email, setEmail] = useState<string>(user?.email!)

    const [image, setImage] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)

    const doc = { firstName, lastName, location, email, image }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        await editUser(doc)
    }

    return (
        <FormWrapper theme={theme} title="Edit Profile">
            <form onSubmit={submit}>
                <label htmlFor='img' className={`form-img ${theme}`}>
                    <ImageInput setImage={setImage} setImageError={setImageError} />
                    {image ?
                        <ImagePreview image={image} style='image' />
                        :
                        <img className='image' src={user?.photoURL!} alt='user icon' />
                    }
                    <img className='choose-img' src={ChooseImage} alt='choose img' />
                </label>
                {imageError && <div className='error'>{imageError}</div>}

                <FormInput value={firstName} setValue={setFirstName} label='First name' />
                <FormInput value={lastName} setValue={setLastName} label='Last name' />
                <FormInput value={location} setValue={setLocation} label='Location - 𝘰𝘱𝘵𝘪𝘰𝘯𝘢𝘭' optional={true} />
                <FormInput value={email} setValue={setEmail} label='Email' type='email' />

                {error && <p>{error}</p>}
                {isPending && <div className="loader"></div>}

                <button className='form-btn'>{isPending ? 'Loading...' : 'Edit Profile'}</button>
            </form>
        </FormWrapper>
    )
}
