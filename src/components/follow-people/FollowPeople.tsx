import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'

//custom hooks
import { useCollection } from '../../hooks/firebase-hooks/useCollection'

//components
import FriendList from '../common/FriendList'

//styles
import './FollowPeople.css'


//types
import { UserDocument } from '../..//types'
import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'

export default function FollowPeople() {
  const { document, isPending, error } = useCollection<UserDocument>('users')
  let usersWithMutualFriends = [] as string[]

  const { user } = useAuthContext()
  const { theme } = useThemeContext()

  const notFriendsOfCurrentUser = (friends: string[]) => {
    if (friends.length === 0) return true

    return friends.some((friendID => friendID !== user?.id))
  }
  const hasMutualFriends = (friends: string[]) => {
    if (friends.length === 0) return false
    return friends.some((friendID) => user?.friends.some(currentUserFriendID => friendID === currentUserFriendID))
  }

  if (document) {
    const filteredDocument = document.filter(userDoc => userDoc.id !== user?.id && notFriendsOfCurrentUser(userDoc.friends) && hasMutualFriends(userDoc.friends))
    filteredDocument.forEach((user) => usersWithMutualFriends.push(user.id))
  }

  if (isPending) (<div className="loader"></div>)
  if (error) (<p className="error">{error}</p>)

  return (
    <div className={`box ${theme}`}>
      <h2>People you may know</h2>
      {usersWithMutualFriends.length > 0 && <FriendList friendsIds={usersWithMutualFriends} />}
    </div>
  )
}
