import { useState } from 'react'
import { CSSClassesState, UserObject } from '../../../types'


//icons
import FriendsIcon from '../../../assets/friends.svg'
import Chat from '../../../assets/chat_icon.svg'

//custom hooks
import { useIsMobile } from '../../../hooks/view-hooks/useIsMobile'

//components
import { NavFriends } from './NavFriends'
import UserDropDown from './UserDropDown'
import useComponentVisible from '../../../hooks/view-hooks/useComponentsVisible'
import { useThemeContext } from '../../../hooks/view-hooks/useThemeContext'


type UserNavbarProps = { theme: string, user: UserObject }

export default function UserNavbar({ user }: UserNavbarProps) {
    const [isMobile] = useIsMobile()
    const { theme } = useThemeContext()

    const [friendsClass, setFriendsClass] = useState<CSSClassesState>('hidden')
    const {
        ref: FriendsRef,
        isComponentVisible: showFriends,
        setIsComponentVisible: setShowFriends } = useComponentVisible(false, setFriendsClass)

    const toggleFriends = () => {
        if (!showFriends) {
            setShowFriends(true)
            setFriendsClass('show')
        }
    }
    const toggleDropDown = () => {
        if (!showDropDown) {
            setShowDropdown(true)
            setDropDownClass('show')
        }
    }

    const [dropDownClass, setDropDownClass] = useState<CSSClassesState>('hidden')
    const {
        ref: DropDownRef,
        isComponentVisible: showDropDown,
        setIsComponentVisible: setShowDropdown } = useComponentVisible(false, setDropDownClass)

    return (
        <>
            {isMobile &&
                <li className='mobile nav-item'>
                    <img onClick={() => toggleFriends()} src={FriendsIcon} alt='chat icon' />
                </li>}
            <li className='nav-item'>
                <img src={Chat} className='nav-img' alt='chat icon' />
            </li>
            <li className='nav-item'>
                <div onClick={toggleDropDown} className='user-dropdown-button'>
                    <img src={user.photoURL || ''} className='user-dropdown-image' />
                    <p style={{ transform: showDropDown ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</p>
                </div>
            </li>
            {showDropDown && <div ref={DropDownRef}><UserDropDown dropDownClass={dropDownClass} /></div>}
            {showFriends && <div className={theme} ref={FriendsRef}><NavFriends friendsClass={friendsClass} /></div>}
        </>
    )
}


