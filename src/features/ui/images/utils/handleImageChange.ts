import { IImageInput } from "../../../../types"

export const handleFileChange =
    (setImage: IImageInput['setImage'], setImageError: IImageInput['setImageError'], selected: File) => {
        setImage(null)
        setImageError(null)

        if (!selected) {
            return setImageError('Please select a file!')
        }
        if (!selected.type.includes('image')) {
            return setImageError('Please select an image file!')
        }
        if (selected.size > 1500000) {
            return setImageError('Image File size must be less than 1.5mb')
        }
        setImage(selected)
    }