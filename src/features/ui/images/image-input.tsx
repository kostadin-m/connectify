import { memo } from "react"
import { IImageInput } from "@types"

export const handleFileChange =
    (changeImage: IImageInput['onImageChange'], changeImageError: IImageInput['onImageErrorChange'], selected: File) => {
        changeImage(null)
        changeImageError(null)

        if (!selected) return changeImageError('Please select a file!')

        if (!selected.type.includes('image')) return changeImageError('Please select an image file!')

        if (selected.size > 1500000) return changeImageError('Image File size must be less than 1.5mb')

        changeImage(selected)
    }

function ImageInput({ onImageChange, onImageErrorChange }: IImageInput) {
    return (
        <input
            data-testid='image input'
            style={{ display: 'none' }}
            type='file'
            id='img'
            onChange={(e) => handleFileChange(onImageChange, onImageErrorChange, e.target.files?.[0]!)} />
    )
}
export default memo(ImageInput)
