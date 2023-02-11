import { useEffect, useState } from "react"
import { useCollection } from "../../../hooks/firebase-hooks/useCollection"
import { UserDocument } from "../../../types"
import FriendList from "../../common/UserList"
import { documentId } from "firebase/firestore"
import { useAuthContext } from "../../../hooks/firebase-hooks/useAuthContext"


export default function UserSearch() {
  const [focusedSearch, setFocusedSearch] = useState<boolean>(false)
  const [searchedUser, setSearchedUser] = useState<string>('')
  const [foundUsers, setFoundUsers] = useState<string[]>([])

  const { user } = useAuthContext()

  const { document, isPending, error } = useCollection<UserDocument>('users', [documentId(), '!=', user?.id])

  useEffect(() => {
    setFoundUsers([])
    if (searchedUser.length > 0 && document) {
      const filteredSearch = document.filter(user => user.displayName.toLowerCase().startsWith(searchedUser.toLowerCase()))
      setFoundUsers(filteredSearch.map(user => user.id))
    }
  }, [searchedUser])

  if (isPending) (<div className="loader"></div>)
  if (error) (<p className="error">{error}</p>)

  return (
    <div className={`input-wrapper ${focusedSearch ? 'focused' : ''}`}>
      <input
        className='nav-input' type='text' placeholder='Search Users'
        value={searchedUser}
        onChange={(e) => setSearchedUser(e.target.value)}
        onFocus={() => setFocusedSearch(true)}
        onBlur={() => { setFocusedSearch(false); setSearchedUser(''); setFoundUsers([]) }}
      />
      {foundUsers.length > 0 && <FriendList friendsIds={foundUsers} />}
    </div>
  )
}
