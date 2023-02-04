import { useState } from "react"
import { useFirestore } from "../hooks/useFirestore"
import { useNavigate } from "react-router-dom"
import { getCurrentUserData } from "../helpers/getCurrentUserData"


//icons
import ChooseImage from '../assets/choose_image.svg'

//firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase/config"
import { updateEmail, updateProfile } from "firebase/auth"

//components
import ImagePreview from "../components/common/ImagePreview"
import ImageInput from "../components/common/ImageInput"
import FormInput from '../components/common/FormInput'

//types
import { IAuthUserObject, UserObject } from "../types"

//custom hooks
import { useThemeContext } from "../hooks/useThemeContext"
import { useAuthContext } from '../hooks/useAuthContext'

export default function EditProfile() {
    //custom hooks
    const { firebaseUser, user, dispatch } = useAuthContext()
    const { theme } = useThemeContext()
    const { updateDocument, response } = useFirestore<UserObject>('users')


    const navigate = useNavigate()

    const [firstName, setFirstName] = useState<string>(user?.displayName?.split(' ')[0]!)
    const [lastName, setLastName] = useState<string>(user?.displayName?.split(' ')[1]!)
    const [location, setLocation] = useState<string>(user?.location!)
    const [email, setEmail] = useState<string>(user?.email!)

    const [image, setImage] = useState<File | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()

        let photoURL = user?.photoURL
        if (image) {
            const imageRef = ref(storage, `thumbnails/${user?.id}/${image.name}`)
            await uploadBytes(imageRef, image)
            photoURL = await getDownloadURL(imageRef)
        }
        const displayName = `${firstName} ${lastName}`

        await updateDocument(user?.id!, { ...user, displayName, photoURL, location } as UserObject)

        if (user?.email !== email) {
            await updateEmail(firebaseUser, email)
        }
        if (user?.displayName !== displayName || user?.photoURL !== photoURL) {
            await updateProfile(firebaseUser, { displayName, photoURL })
        }
        if (!response.error) {
            dispatch({
                type: 'AUTH_IS_READY', payload: { ...user, displayName, photoURL, location } as IAuthUserObject
            })
            navigate('/')
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
                        <img className='image' src={user?.photoURL!} alt='user icon' />
                    }
                    <img className='choose-img' src={ChooseImage} alt='choose img' />
                </label>
                {imageError && <div className='error'>{imageError}</div>}

                <FormInput value={firstName} setValue={setFirstName} label='First name' />
                <FormInput value={lastName} setValue={setLastName} label='Last name' />
                <FormInput value={location} setValue={setLocation} label='Location - 𝘰𝘱𝘵𝘪𝘰𝘯𝘢𝘭' optional={true} />
                <FormInput value={email} setValue={setEmail} label='Email' type='email' />

                {response.error && <p>{response.error}</p>}

                <button className='form-btn'>{response.isPending ? 'Loading...' : 'Edit Profile'}</button>
            </form>
        </div>
    )
}
