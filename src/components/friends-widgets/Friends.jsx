import { useThemeContext } from '../../hooks/useThemeContext'

import Test from '../../assets/test.jpg'
//icons
import Accept from '../../assets/accept_request.svg'
import Deny from '../../assets/close_icon.svg'

//styles
import './Friends.css'
import FriendList from './components/FriendList'

export default function FriendRequests() {

    const { theme } = useThemeContext()

    return (
        <div className={`friends ${theme}`}>
            <h2 className='title'>Friend List</h2>
            <FriendList theme={theme} />
        </div>
    )
}
