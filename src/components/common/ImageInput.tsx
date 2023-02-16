import { memo } from "react"
import { handleFileChange } from "../../helpers/handleImageChange"
import { IImageInput } from "../../types"

function ImageInput({ setImage, setImageError }: IImageInput) {
    return (
        <input
            style={{ display: 'none' }}
            type='file'
            id='img'
            onChange={(e) => handleFileChange(setImage, setImageError, e.target.files?.[0]!)} />
    )
}
export default memo(ImageInput)
