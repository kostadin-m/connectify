import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'

//types
import { UserObject } from '@types'

//icons
import { FriendsIcon, ChatIcon } from '@assets'

//custom hooks
import { useIsMobile, useThemeContext } from '@features/hooks'

//components
import { NavFriends } from '@features/friends'
import UserDropDown from './user-dropdown'
import AlertClickedOutside from '@features/ui/navbar/hocs/alert-clicked-outside'

interface UserNavbarProps {
    theme: string
    user: UserObject
}

export default function UserNavbar({ user }: UserNavbarProps) {
    const [isMobile] = useIsMobile(800)
    const { theme } = useThemeContext()

    const [friends, setShowFriends] = useState<boolean>(false)

    const [showDropDown, setShowDropDown] = useState<boolean>(false)

    const CloseIfAnchorClicked = (e: React.MouseEvent<HTMLElement>, toggleElement: Dispatch<SetStateAction<boolean>>) => {
        const clickedElement = e.target
        if (!(clickedElement instanceof HTMLAnchorElement)) return
        setTimeout(() => toggleElement(false), 30)
    }

    return (
        <>
            {isMobile ?
                <li data-testid='user-nav' className='nav-item'>
                    <img onClick={() => setShowFriends(!friends)} src={FriendsIcon} alt='chat icon' />
                </li>
                : null}
            <li data-testid='user-nav'
                className='nav-item'>
                <Link style={{ height: '25px' }} to='/messages'>
                    <img src={ChatIcon} className='nav-img' alt='chat icon' />
                </Link>
            </li>
            <li data-testid='user-nav' className='nav-item'>
                <div onClick={() => setShowDropDown(!showDropDown)} className='user-dropdown-button'>
                    <img src={user.photoURL || ''} className='profile-image' alt='navbar-profile-img' />
                    <p style={{ transform: showDropDown ? 'rotate(0deg)' : 'rotate(180deg)' }}>▼</p>
                </div>
            </li>
            {showDropDown ?
                <AlertClickedOutside onAlert={() => setShowDropDown(false)}>
                    <div className={theme} onClick={(e) => CloseIfAnchorClicked(e, setShowFriends)}></div>
                    <UserDropDown />
                </AlertClickedOutside>
                : null}
            {friends ?
                <AlertClickedOutside onAlert={() => setShowFriends(false)}>
                    <div className={theme} onClick={(e) => CloseIfAnchorClicked(e, setShowFriends)}>
                        <NavFriends />
                    </div>
                </AlertClickedOutside>
                : null}
        </>
    )
}


