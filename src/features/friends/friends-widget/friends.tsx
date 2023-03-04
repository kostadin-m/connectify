//custom hooks
import { useThemeContext } from "@hooks"

//types
import { UserDocument } from '@types'
//components
import { UserList } from '@features/user'

//styles
import styles from './friends.module.css'

import { memo } from 'react'

interface FriendsProps {
    friends: UserDocument[]
    isPending?: boolean
    error?: string | null
}

function Friends({ friends, isPending, error }: FriendsProps) {
    const { theme } = useThemeContext()

    return (
        <div className={`${styles.friends} ${styles[theme]}`}>
            <h2>Friend List</h2>
            {friends.length > 0 ? <UserList users={friends} /> : <h4 className='error'>No Friends</h4>}
            {error && <p className='error'>{error}</p>}
            {isPending && <h4>Loading Friends...</h4>}
        </div>
    )
}
export default memo(Friends)
