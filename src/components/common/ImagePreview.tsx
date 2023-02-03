import React from 'react';
import { useState, memo } from 'react';

import { IPreviewImage } from 'src/types';

export default function ImagePreview({ image, style }: IPreviewImage) {
    const [img, setImage] = useState<string | null>(null)

    if (!image) {
        setImage(null)
        return <></>
    }
    const reader = new FileReader()

    reader.readAsDataURL(image)

    reader.onload = () => {
        setImage(reader.result?.toString()!)
    }

    return (
        <>
            <img className={style} src={img ? img : ''} alt='post image preview' />
        </>
    )
}

