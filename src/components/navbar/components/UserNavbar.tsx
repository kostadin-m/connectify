import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSClassesState, UserObject } from '../../../types'


//icons
import FriendsIcon from '../../../assets/friends.svg'
import Chat from '../../../assets/chat_icon.svg'

//custom hooks
import { useLogout } from '../../../hooks/firebase-hooks/useLogout'
import { useIsMobile } from '../../../hooks/view-hooks/useIsMobile'
import { useDelayToUnmount } from '../../../hooks/view-hooks/useDelayToUnmount'

//components
import { NavFriends } from './NavFriends'


type UserNavbarProps = { theme: string, user: UserObject }

export default function UserNavbar({ theme, user }: UserNavbarProps) {
    const [friendsClass, setFriendsClass] = useState<CSSClassesState>('hidden')
    const [showFriends, setShowFriends] = useState(false)

    const [isMobile] = useIsMobile()
    const { logout, error, isPending } = useLogout()
    const { toggleMount } = useDelayToUnmount(friendsClass, setShowFriends, setFriendsClass)

    if (error) return <div>{error}</div>
    if (isPending) return <div>Loading...</div>

    return (
        <>
            {isMobile &&
                <li className='mobile nav-item'>
                    <img onClick={toggleMount} src={FriendsIcon} alt='chat icon' />
                </li>}
            {showFriends && < NavFriends friendsClass={friendsClass} />}
            <li className='nav-item'>
                <img src={Chat} className='nav-img' alt='chat icon' />
            </li>
            <li className='nav-item'>
                <img onClick={logout} src={user.photoURL || ''} className={`user-dropdown-button ${theme}`} />
            </li>
        </>
    )
}


