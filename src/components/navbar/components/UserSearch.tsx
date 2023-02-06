import { useState } from "react"
import { useCollection } from "../../../hooks/firebase-hooks/useCollection"
import { UserDocument } from "../../../types"
import FriendList from "../../common/FriendList"


export default function UserSearch() {
  const [focusedSearch, setFocusedSearch] = useState<boolean>(false)
  const [searchedUser, setSearchedUser] = useState<string>('')

  const { document, error, isPending } = useCollection<UserDocument>('users')

  return (
    <div className={`input-wrapper ${focusedSearch ? 'focused' : ''}`}>
      <input
        className='nav-input' type='text' placeholder='Search Users'
        value={searchedUser}
        onChange={(e) => setSearchedUser(e.target.value)}
        onFocus={() => setFocusedSearch(true)}
        onBlur={() => setFocusedSearch(false)}
      />
      {focusedSearch ?
        isPending && <p>Loading...</p>
        || error && <p className='error'>{error}</p>
        || document && <FriendList friends={document} />
        : null}
    </div>
  )
}
