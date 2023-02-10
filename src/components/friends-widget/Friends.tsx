import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'

import Test from '../../assets/test.jpg'
//icons
import Accept from '../../assets/accept_request.svg'
import Deny from '../../assets/close_icon.svg'

//styles
import './Friends.css'
import FriendList from '../common/FriendList'

import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'
import { UserDocument, UserObject } from '../../types'

interface FriendsProps {
    user: UserDocument | UserObject
}

export default function FriendRequests({ user }: FriendsProps) {
    const { theme } = useThemeContext()

    return (
        <div className={`friends ${theme}`}>
            <h2>Friend List</h2>
            <FriendList friendsIds={user?.friends!} />
        </div>
    )
}
