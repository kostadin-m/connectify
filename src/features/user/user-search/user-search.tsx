import { useEffect, useState } from "react"
import { documentId } from "firebase/firestore"

import { UserDocument } from "@types"
//custom hooks
import { useAuthContext, useClickedOutside, useCollection } from "@features/hooks"

// components
import { UserList } from "@features/user"

export default function UserSearch() {
    const [searchedUser, setSearchedUser] = useState<string>('')
    const [foundUsers, setFoundUsers] = useState<string[]>([])

    const [showSearch, setShowSearch] = useState<boolean>(false)
    const { ref } = useClickedOutside(setShowSearch)

    const { user } = useAuthContext()
    const { document, isPending } = useCollection<UserDocument>('users', [documentId(), '!=', user?.id])

    const searchWrapperClass = showSearch ? 'show' : 'hidden'
    const isOpened = searchWrapperClass === 'show' && showSearch

    useEffect(() => {
        setFoundUsers([])
        if (searchWrapperClass === 'hidden') setSearchedUser('')

        if (searchedUser.length === 0 || !document || !showSearch) return

        const filteredSearch = document.filter(user => user.displayName.toLowerCase().startsWith(searchedUser.toLowerCase()))

        setFoundUsers(filteredSearch.map(user => user.id))

    }, [searchedUser, showSearch, document])


    return (
        <div ref={ref} className={`input-wrapper ${searchWrapperClass} `}>
            <input
                className='nav-input' type='text' placeholder='Search Users'
                value={searchedUser}
                onChange={(e) => setSearchedUser(e.target.value)}
                onFocus={() => { setShowSearch(true) }}
            />
            {isOpened && foundUsers.length > 0 && <UserList userIDS={foundUsers} />}
            {isOpened && foundUsers.length === 0 && searchedUser.length > 0 && !isPending && <h4 className="error">No users found!</h4>}
        </div>
    )
}
