import { memo } from "react"
import { handleFileChange } from "../../helpers/handleImageChange"

function ImageInput({ setImage, setImageError }) {
    return (
        <input
            required
            style={{ display: 'none' }}
            type='file'
            id='img'
            onChange={(e) => handleFileChange(setImage, setImageError, e.target.files[0])} />
    )
}
export default memo(ImageInput)
