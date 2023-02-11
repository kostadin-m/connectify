import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'

import Test from '../../assets/test.jpg'
//icons
import Accept from '../../assets/accept_request.svg'
import Deny from '../../assets/close_icon.svg'

//styles
import './Friends.css'

import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'
import { UserDocument, UserObject } from '../../types'
import UserList from '../common/UserList'

interface FriendsProps {
    friends: string[]
}

export default function Friends({ friends }: FriendsProps) {
    const { theme } = useThemeContext()

    return (
        <div className={`friends ${theme}`}>
            <h2>Friend List</h2>
            <UserList friendsIds={friends} />
        </div>
    )
}
