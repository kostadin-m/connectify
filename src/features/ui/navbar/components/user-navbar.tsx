import { useState } from 'react'
import { Link } from 'react-router-dom'

//types
import { CSSClassesState, UserObject } from '@types'

//icons
import { FriendsIcon, ChatIcon } from '@assets'

//custom hooks
import { useIsMobile, useComponentsVisible, useThemeContext } from '@hooks'

//components
import { NavFriends } from '@features/friends'
import UserDropDown from './user-dropdown'


type UserNavbarProps = { theme: string, user: UserObject }

export default function UserNavbar({ user }: UserNavbarProps) {
    const [isMobile] = useIsMobile(800)
    const { theme } = useThemeContext()

    const [friendsClass, setFriendsClass] = useState<CSSClassesState>('hidden')
    const {
        ref: FriendsRef,
        isComponentVisible: showFriends,
        setIsComponentVisible: setShowFriends } = useComponentsVisible(false, setFriendsClass, 580)

    const [dropDownClass, setDropDownClass] = useState<CSSClassesState>('hidden')
    const {
        ref: DropDownRef,
        isComponentVisible: showDropDown,
        setIsComponentVisible: setShowDropdown } = useComponentsVisible(false, setDropDownClass, 580)

    //Showing the Components only when they are hidden because useComponentVisible takes care of the closing
    const toggleFriends = () => {
        if (!showFriends) return

        setShowFriends(true)
        setFriendsClass('show')
    }
    const toggleDropDown = () => {
        if (showDropDown) return

        setShowDropdown(true)
        setDropDownClass('show')
    }
    return (
        <>
            {isMobile &&
                <li data-testid='user-nav' className='nav-item'>
                    <img onClick={() => toggleFriends()} src={FriendsIcon} alt='chat icon' />
                </li>}
            <li data-testid='user-nav'
                className='nav-item'>
                <Link style={{ height: '25px' }} to='/messages'>
                    <img src={ChatIcon} className='nav-img' alt='chat icon' />
                </Link>
            </li>
            <li data-testid='user-nav' className='nav-item'>
                <div onClick={toggleDropDown} className='user-dropdown-button'>
                    <img src={user.photoURL || ''} className='profile-image' alt='navbar-profile-img' />
                    <p style={{ transform: dropDownClass === 'show' ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</p>
                </div>
            </li>
            {showDropDown && <div ref={DropDownRef}><UserDropDown dropDownClass={dropDownClass} /></div>}
            {showFriends && <div className={theme} ref={FriendsRef}><NavFriends friendsClass={friendsClass} /></div>}
        </>
    )
}


