//custom hooks
import { useThemeContext } from "@hooks"

//types
import { UserDocument } from '@types'
//components
import { UserList } from '@features/user'

//styles
import './friends.css'

import { memo } from 'react'

interface FriendsProps {
    friends: UserDocument[]
    isPending: boolean
    error: string | null
}

function Friends({ friends, isPending, error }: FriendsProps) {
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
export default memo(Friends)
