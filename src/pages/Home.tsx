//components
import FriendRequests from '../components/friends-widgets/Friends'
import PostForm from '../components/post-form/PostForm'
import UserWidget from '../components/user-widget/UserWidget'
import Feed from '../components/posts/Feed'
import FollowPeople from '../components/follow-people/FollowPeople'
import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'

export default function Home() {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    // checking the current window size so we can conditionally render "FollowPeople" Component
    const handleResize = () => {
        if (window.innerWidth < 1250) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })
    console.log(isMobile)

    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget />
                <FriendRequests />
            </div>
            <div className='page-item'>
                <PostForm />
                {isMobile && <FollowPeople />}
                <Feed />
            </div>
            {!isMobile && <FollowPeople />}
        </div>
    )
}
