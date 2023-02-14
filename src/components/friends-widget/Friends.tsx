import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'


//styles
import './Friends.css'

import UserList from '../common/UserList'

interface FriendsProps {
    friends: string[]
}

export default function Friends({ friends }: FriendsProps) {
    const { theme } = useThemeContext()

    return (
        <div className={`friends ${theme}`}>
            <h2>Friend List</h2>
            {friends.length > 0 && <UserList friendsIds={friends} />}
            {friends.length === 0 && <h4 className='error'>No Friends</h4>}
        </div>
    )
}
