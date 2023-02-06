import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'
import { useState } from 'react'

//components
import LocationModal from '../modals/LocationModal/LocationModal'
import ImagePreview from '../common/ImagePreview'

//icons
import Close from '../../assets/close_icon.svg'
import Location from '../../assets/location_icon.svg'
import AddImage from '../../assets/add_image.svg'
import TestPic from '../../assets/test.jpg'

//styles
import styles from './PostForm.module.css'
import Button from '../common/Button'
import TextArea from '../common/TextArea'
import ImageInput from '../common/ImageInput'


export default function PostForm() {
    //Modal State
    const [showLocationModal, setShowLocationModal] = useState(false)
    //Form State
    const [text, setText] = useState<string>('')
    const [image, setImage] = useState<File | null>()
    const [imageError, setImageError] = useState<string | null>()
    const [location, setLocation] = useState<string>('')

    const { theme } = useThemeContext()

    const handlePostSubmit = () => {
        console.log('da')
    }
    return (
        <div className={`${styles.postForm} ${styles[theme]}`}>
            <div className={`${styles.formWrapper} ${styles[theme]}`}>
                <div className={`${styles.formTop} ${styles[theme]}`}>
                    <img className='profile-image' src={TestPic} alt='no user icon'></img>
                    <TextArea value={text} setValue={setText} placeholder="What's on your mind User?" theme={theme} />
                </div>

                {imageError && <p className='error'>{imageError}</p>}
                {image && <div className={styles[theme]}>
                    <img onClick={() => setImage(null)} className={styles.remove} src={Close} alt='close icon' />
                    <ImagePreview image={image} style={styles.imagePreview} />
                </div>}

                <hr className={styles.formHr} />
                <div className={`${styles.formBottom} ${styles[theme]}`}>
                    <div className={styles.formOptions}>
                        <label htmlFor='img' className={`${styles.formOption} ${styles[theme]}`}>
                            <ImageInput setImage={setImage} setImageError={setImageError} />
                            <img className={styles.optionPicture} src={AddImage} alt='add image picture'></img>
                            <span>Photo or Video</span>
                        </label>
                        <div className={styles[theme]} style={{ display: 'flex' }}>
                            <div className={`${styles.formOption} ${styles[theme]}`} onClick={() => setShowLocationModal(true)}>
                                <img className={styles.optionPicture} src={Location} alt='add image picture'></img>
                                <span>{location ? location : "Location"}</span>
                            </div>
                            {location && <img onClick={() => setLocation('')} className={styles.remove} src={Close} alt='close icon' />}
                        </div>
                        <Button theme={theme} text={`Share a post`} onClick={() => console.log('clicked')} />
                    </div>
                </div>
            </div>
            {/* Modals */}
            {showLocationModal && <LocationModal setLocation={setLocation} setShowLocationModal={setShowLocationModal} theme={theme} />}
        </div >
    )
}
