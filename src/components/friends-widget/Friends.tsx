import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'


//styles
import './Friends.css'

import UserList from '../common/UserList'
import { UserDocument } from '../../types'

interface FriendsProps {
    friends: UserDocument[]
    isPending: boolean
    error: string | null
}

export default function Friends({ friends, isPending, error }: FriendsProps) {
    const { theme } = useThemeContext()

    return (
        <div className={`friends ${theme}`}>
            <h2>Friend List</h2>
            {friends.length > 0 && <UserList users={friends} />}
            {error && <p className='error'>{error}</p>}
            {isPending && <h4>Loading Friends...</h4>}
            {friends.length === 0 && <h4 className='error'>No Friends</h4>}
        </div>
    )
}
