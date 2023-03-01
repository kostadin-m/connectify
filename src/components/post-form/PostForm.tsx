import { memo, useState } from 'react'

//components
import LocationModal from '../modals/LocationModal/LocationModal'
import ImagePreview from '../ui/ImagePreview'
import Button from '../ui/Button'
import TextArea from '../ui/TextArea'
import ImageInput from '../ui/ImageInput'

//icons
import { CloseIcon, LocationIcon, AddImage } from '@assets'

//styles
import styles from './PostForm.module.css'

//custom hooks
import { useThemeContext, useAuthContext, useFirestore } from '@hooks'

//firebase
import { storage, timeStamp } from '../../firebase/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { PostObject } from '@types'


function PostForm() {
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
                    <img className='profile-image' src={user?.photoURL} alt='user icon'></img>
                    <TextArea value={text} setValue={setText} placeholder={`What's on your mind ${user?.displayName}?`} theme={theme} />
                </div>

                {formError && <p className='error'>{formError}</p>}
                {image && <div className={styles[theme]}>
                    <img onClick={() => setImage(null)} className={styles.remove} src={CloseIcon} alt='close icon' />
                    <ImagePreview image={image} style={styles.imagePreview} />
                </div>}

                <hr className={styles.formHr} />
                <div className={`${styles.formBottom} ${styles[theme]}`}>
                    <div className={styles.formOptions}>
                        <label htmlFor='img' className={`${styles.formOption} ${styles[theme]}`}>
                            <ImageInput setImage={setImage} setImageError={setFormError} />
                            <img className={styles.optionPicture} src={AddImage} alt='picture icon'></img>
                            <span>Photo</span>
                        </label>
                        <div className={styles[theme]} style={{ display: 'flex' }}>
                            <div className={`${styles.formOption} ${styles[theme]}`} onClick={() => setShowLocationModal(true)}>
                                <img className={styles.optionPicture} src={LocationIcon} alt='location icon'></img>
                                <span>{location ? location : "Location"}</span>
                            </div>
                            {location && <img style={{ position: 'relative' }} onClick={() => setLocation('')} className={styles.remove} src={CloseIcon} alt='close icon' />}
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
export default memo(PostForm)