import { useState, useRef } from 'react'
import { useLogout } from '../../../hooks/useLogout'
import { useThemeContext } from '../../../hooks/useThemeContext'
import { Link } from 'react-router-dom'


//icons
import FriendsIcon from '../../../assets/friends.svg'
import Chat from '../../../assets/chat_icon.svg'

//components
import FriendList from '../../friends-widgets/components/FriendList'


const NavFriends = ({ friendsClass }) => {
    const { theme } = useThemeContext()

    return (
        <>
            <div className={`nav-friends ${friendsClass}`}>
                <FriendList theme={theme} />
            </div>
        </>
    )

}

export default function UserNavbar({ theme, user }) {
    const [friendsClass, setFriendsClass] = useState('hide')

    const [showFriends, setShowFriends] = useState(false)

    const { logout, error, isPending } = useLogout()

    const timeoutRef = useRef()

    //Using timeout so we can apply wait for the animation to end and then we remove the element from the dom
    const toggleShowFriends = () => {
        if (friendsClass == 'show') {
            setFriendsClass('hide')
            timeoutRef.current = setTimeout(() => setShowFriends(false), 680)
        } else {
            setFriendsClass('show')
            setShowFriends(true)
            clearTimeout(timeoutRef.current)
        }
    }

    if (error) return <div>{error}</div>
    if (isPending) return <div>Loading...</div>

    return (
        <>
            <li className='mobile nav-item'>
                <img onClick={toggleShowFriends} src={FriendsIcon} alt='chat icon' />
            </li>
            {showFriends && < NavFriends friendsClass={friendsClass} />}
            <li className='nav-item'>
                <Link className='nav-item' to='/messages'>
                    <img src={Chat} alt='chat icon' />
                </Link>
            </li>
            <li className='nav-item'>
                <button onClick={logout} className={`user-dropdown-button ${theme}`}>Logout</button>
            </li>
        </>
    )
}


