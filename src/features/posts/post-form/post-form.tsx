import { memo, useState } from 'react'

//components
import { LocationModal, ImagePreview, ImageInput, TextArea, Button } from '@features/ui'


//icons
import { CloseIcon, LocationIcon, AddImage } from '@assets'

//styles
import styles from './post-form.module.css'

//custom hooks
import { useThemeContext, useAuthContext, useFirestore } from '@features/hooks'

import { uploadImage } from '@features/services/image-services'

//firebase
import { timeStamp } from '../../../firebase/config'
import { PostObject } from '@types'


function PostForm() {
    const [showLocationModal, setShowLocationModal] = useState(false)

    const [text, setText] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [formError, setFormError] = useState<string | null>(null)
    const [location, setLocation] = useState<string>('')
    const [pending, setPending] = useState(false)


    const { response, addDocument } = useFirestore<PostObject>('posts')
    const { user } = useAuthContext()
    const { theme } = useThemeContext()

    const onTextChange = (value: string) => setText(value)
    const changeLocation = (value: string) => setLocation(value)
    const onImageErrorChange = (value: string | null) => setFormError(value)
    const onImageChange = (value: File | null) => setImage(value)

    const handlePostSubmit = async () => {
        setPending(true)
        if (!image) return setFormError('Please choose an image!')

        const photoURL = await uploadImage('postPictures', user?.id!, image)
        const createdAt = timeStamp.fromDate(new Date())
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

        setPending(false)
        if (!response.error) {
            setLocation('')
            setImage(null)
            setText('')
        }
    }

    return (
        <div className={`${styles.postForm} ${styles[theme]}`}>
            <div className={`${styles.formWrapper} ${styles[theme]}`}>
                <div className={`${styles.formTop} ${styles[theme]}`}>
                    <img className='profile-image' src={user?.photoURL} alt='user icon'></img>
                    <TextArea value={text} onChange={onTextChange} placeholder={`What's on your mind ${user?.displayName}?`} theme={theme} />
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
                            <ImageInput onImageChange={onImageChange} onImageErrorChange={onImageErrorChange} />
                            <img className={styles.optionPicture} src={AddImage} alt='picture icon'></img>
                            <span>Photo</span>
                        </label>
                        <div className={styles[theme]} style={{ display: 'flex' }}>
                            <div className={`${styles.formOption} ${styles[theme]}`} onClick={() => setShowLocationModal(true)}>
                                <img className={styles.optionPicture} src={LocationIcon} alt='location icon'></img>
                                <span>{location ? location : "Location"}</span>
                            </div>
                            {location ?
                                <img style={{ position: 'relative' }}
                                    onClick={() => setLocation('')}
                                    className={styles.remove}
                                    src={CloseIcon} alt='close icon' />
                                : null}
                        </div>
                        <Button disabled={pending} theme={theme} text={pending ? 'Loading...' : `Share`} onClick={() => handlePostSubmit()} />
                    </div>
                </div>
            </div>
            {showLocationModal && <LocationModal changeLocation={changeLocation} onModalClose={() => setShowLocationModal(false)} theme={theme} />}
        </div >
    )
}
export default memo(PostForm)