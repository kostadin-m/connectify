import { useEffect, useState } from "react"
import { documentId } from "firebase/firestore"


// types
import { CSSClassesState, UserDocument } from "@types"

//custom hooks
import { useAuthContext, useComponentsVisible, useCollection } from "@hooks"

// components
import { UserList } from "@features"

export default function UserSearch() {
    const [searchWrapperClass, setSearchWrapperClass] = useState<CSSClassesState>('hidden')
    const [searchedUser, setSearchedUser] = useState<string>('')
    const [foundUsers, setFoundUsers] = useState<UserDocument[]>([])


    const { user } = useAuthContext()
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentsVisible(false, setSearchWrapperClass, 40)
    const { document, isPending } = useCollection<UserDocument>('users', [documentId(), '!=', user?.id])

    useEffect(() => {
        setFoundUsers([])
        if (searchWrapperClass === 'hidden') {
            setSearchedUser('')
        }

        if (searchedUser.length > 0 && document && isComponentVisible) {
            const filteredSearch = document.filter(user => user.displayName.toLowerCase().startsWith(searchedUser.toLowerCase()))
            setFoundUsers(filteredSearch.map(user => user))
        }
    }, [searchedUser, isComponentVisible, document])

    const isOpened = searchWrapperClass === 'show' && isComponentVisible

    return (
        <div ref={ref} className={`input-wrapper ${searchWrapperClass} `}>
            <input
                className='nav-input' type='text' placeholder='Search Users'
                value={searchedUser}
                onChange={(e) => setSearchedUser(e.target.value)}
                onFocus={() => { setIsComponentVisible(true); setSearchWrapperClass('show') }}
            />
            {isOpened && foundUsers.length > 0 && <UserList users={foundUsers} />}
            {isOpened && foundUsers.length === 0 && searchedUser.length > 0 && !isPending && <h4 className="error">No users found!</h4>}
        </div>
    )
}
