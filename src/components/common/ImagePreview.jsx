import { useState, memo } from 'react';

function ImagePreview({ image, style, loadingImage = null }) {
    const [img, setImage] = useState('')

    if (!image) {
        setImage(null)
        return
    }
    const reader = new FileReader()

    reader.readAsDataURL(image)

    reader.onload = () => {
        setImage(reader.result)
    }

    return (
        <>
            <img className={style} src={loadingImage ? img || loadingImage : img} alt='post image preview' />
        </>
    )
}
export default memo(ImagePreview)
