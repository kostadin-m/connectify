import { useEffect, useState } from "react"
import { documentId } from "firebase/firestore"

import { UserDocument } from "@types"
//custom hooks
import { useAuthContext, useCollection, useThemeContext } from "@features/hooks"

// components
import { UserList } from "@features/user"
import AlertClickedOutside from "@features/ui/navbar/hocs/alert-clicked-outside"
import { closeIfClickedOnAnchor } from "@features/ui/navbar/utils"

export default function UserSearch() {
    const [searchedUser, setSearchedUser] = useState<string>('')
    const [foundUsers, setFoundUsers] = useState<string[]>([])
    const [showSearch, setShowSearch] = useState<boolean>(false)

    const { theme } = useThemeContext()
    const { user } = useAuthContext()
    const { document, isPending } = useCollection<UserDocument>('users', [documentId(), '!=', user?.id])

    const closeSearch = () => setShowSearch(false)

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
        <AlertClickedOutside onAlert={() => setShowSearch(false)}>
            <div
                className={`input-wrapper ${searchWrapperClass} ${theme}`}
                onClick={(e) => closeIfClickedOnAnchor(e, closeSearch)}>
                <input
                    className={`nav-input ${theme}`} type='text' placeholder='Search Users'
                    value={searchedUser}
                    onChange={(e) => setSearchedUser(e.target.value)}
                    onFocus={() => { setShowSearch(true) }}
                />
                {isOpened && foundUsers.length > 0 && <UserList userIDS={foundUsers} />}
                {isOpened && foundUsers.length === 0 && searchedUser.length > 0 && !isPending && <h4 className="error">No users found!</h4>}
            </div>
        </AlertClickedOutside>
    )
}
