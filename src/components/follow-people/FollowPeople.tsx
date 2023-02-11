import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'

//custom hooks
import { useCollection } from '../../hooks/firebase-hooks/useCollection'

//components
import UserList from '../common/UserList'

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


  if (document) {
    const notFriendsOfCurrentUser =
      (friends: string[]) => friends.some((friendID => friendID !== user?.id || friends.length === 0))

    const hasMutualFriends =
      (friends: string[]) => friends.some((friendID) =>
        user?.friends.some(currentUserFriendID => friendID === currentUserFriendID && friends.length > 0))

    const areNotInRequests = (userID: string) =>
      !user?.sentFriendRequests.includes(userID) && !user?.receivedFriendRequests.includes(userID)


    const filteredDocument = document.filter(userDoc => userDoc.id !== user?.id && notFriendsOfCurrentUser(userDoc.friends) && hasMutualFriends(userDoc.friends) && areNotInRequests(userDoc.id))
    filteredDocument.forEach((user) => usersWithMutualFriends.push(user.id))
  }


  if (isPending) (<div className="loader"></div>)
  if (error) (<p className="error">{error}</p>)

  return (
    <div className={`box ${theme}`}>
      <h2>People you may know</h2>
      {usersWithMutualFriends.length > 0 && <UserList friendsIds={usersWithMutualFriends} />}
    </div>
  )
}
