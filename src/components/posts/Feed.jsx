import { useThemeContext } from '../../hooks/useThemeContext'
import { useState } from 'react'

//components
import Post from './components/Post'

export default function Feed({ id }) {
    return (
        <div className='feed'>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}
