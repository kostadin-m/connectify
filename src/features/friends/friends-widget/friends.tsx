//custom hooks
import { useThemeContext } from "@features/hooks"

//components
import { UserList } from '@features/user'

//styles
import styles from './friends.module.css'

import { memo } from 'react'

interface FriendsProps {
    friendsIDS: string[]
}

function Friends({ friendsIDS }: FriendsProps) {
    const { theme } = useThemeContext()

    return (
        <div className={`${styles.friends} ${styles[theme]}`}>
            <h2>Friend List</h2>
            {friendsIDS.length > 0 ? <UserList userIDS={friendsIDS} /> : <h4 className='error'>No Friends</h4>}
        </div>
    )
}
export default memo(Friends)
