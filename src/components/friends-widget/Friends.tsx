import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'

import Test from '../../assets/test.jpg'
//icons
import Accept from '../../assets/accept_request.svg'
import Deny from '../../assets/close_icon.svg'

//styles
import './Friends.css'
import FriendList from '../common/FriendList'

import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'

export default function FriendRequests() {
    const { theme } = useThemeContext()
    const { user } = useAuthContext()



    return (
        <div className={`friends ${theme}`}>
            <h2>Friend List</h2>
            <FriendList friendsIds={user?.friends!} />
        </div>
    )
}
