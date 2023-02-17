import { useState } from 'react'

//components
import LocationModal from '../modals/LocationModal/LocationModal'
import ImagePreview from '../common/ImagePreview'
import Button from '../common/Button'
import TextArea from '../common/TextArea'
import ImageInput from '../common/ImageInput'

//icons
import Close from '../../assets/close_icon.svg'
import Location from '../../assets/location_icon.svg'
import AddImage from '../../assets/add_image.svg'

//styles
import styles from './PostForm.module.css'

//custom hooks
import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'
import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'

//firebase
import { storage, timeStamp } from '../../firebase/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useFirestore } from '../../hooks/firebase-hooks/useFirestore'
import { PostObject } from '../../types'


export default function PostForm() {
    //Modal State
    const [showLocationModal, setShowLocationModal] = useState(false)
    const { response, addDocument } = useFirestore<PostObject>('posts')
    //Form State
    const [text, setText] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [formError, setFormError] = useState<string | null>(null)
    const [location, setLocation] = useState<string>('')

    const [pending, setPending] = useState(false)

    const { user } = useAuthContext()
    const { theme } = useThemeContext()

    const handlePostSubmit = async () => {
        setPending(true)
        if (!image) {
            setFormError('Please choose an image!')
            return
        }
        const createdAt = timeStamp.fromDate(new Date())
        const imageRef = ref(storage, `postPictures/${user?.id!}/${image.name}`)
        await uploadBytes(imageRef, image)
        const photoURL = await getDownloadURL(imageRef)

        const postObject = {
            postTitle: text,
            photoURL,
            location,
            creatorID: user?.id!,
            createdAt,
            comments: [],
            likes: []
        } as PostObject

        await addDocument(postObject)

        if (!response.error) {
            setText('')
            setImage(null)
            setLocation('')
        }
        setPending(false)
    }

    return (
        <div className={`${styles.postForm} ${styles[theme]}`}>
            <div className={`${styles.formWrapper} ${styles[theme]}`}>
                <div className={`${styles.formTop} ${styles[theme]}`}>
                    <img className='profile-image' src={user?.photoURL} alt='no user icon'></img>
                    <TextArea value={text} setValue={setText} placeholder={`What's on your mind ${user?.displayName}?`} theme={theme} />
                </div>

                {formError && <p className='error'>{formError}</p>}
                {image && <div className={styles[theme]}>
                    <img onClick={() => setImage(null)} className={styles.remove} src={Close} alt='close icon' />
                    <ImagePreview image={image} style={styles.imagePreview} />
                </div>}

                <hr className={styles.formHr} />
                <div className={`${styles.formBottom} ${styles[theme]}`}>
                    <div className={styles.formOptions}>
                        <label htmlFor='img' className={`${styles.formOption} ${styles[theme]}`}>
                            <ImageInput setImage={setImage} setImageError={setFormError} />
                            <img className={styles.optionPicture} src={AddImage} alt='add image picture'></img>
                            <span>Photo</span>
                        </label>
                        <div className={styles[theme]} style={{ display: 'flex' }}>
                            <div className={`${styles.formOption} ${styles[theme]}`} onClick={() => setShowLocationModal(true)}>
                                <img className={styles.optionPicture} src={Location} alt='add image picture'></img>
                                <span>{location ? location : "Location"}</span>
                            </div>
                            {location && <img style={{ position: 'relative' }} onClick={() => setLocation('')} className={styles.remove} src={Close} alt='close icon' />}
                        </div>
                        <Button disabled={pending} theme={theme} text={pending ? 'Loading...' : `Share a post`} onClick={() => handlePostSubmit()} />
                    </div>
                </div>
            </div>
            {/* Modals */}
            {showLocationModal && <LocationModal setLocation={setLocation} setShowLocationModal={setShowLocationModal} theme={theme} />}
        </div >
    )
}
