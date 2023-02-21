//custom hooks
import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'
import { useCollection } from '../../hooks/firebase-hooks/useCollection'

//components
import UserList from '../common/UserList'

//styles
import './PeopleYouMayKnow.css'


//types
import { UserDocument } from '../../types'
import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext'
import { documentId } from 'firebase/firestore'

export default function PeopleYouMayKnow() {
  let usersWithMutualFriends = [] as UserDocument[]

  const { user } = useAuthContext()
  const { theme } = useThemeContext()

  const { document, isPending, error } = useCollection<UserDocument>('users', [documentId(), '!=', user?.id!])

  if (document) {
    const notFriendsOfCurrentUser =
      (friends: string[]) => friends.some((friendID => friendID !== user?.id || friends.length === 0))

    const hasMutualFriends =
      (friends: string[]) => friends.some((friendID) =>
        user?.friends.some(currentUserFriendID => friendID === currentUserFriendID && friends.length > 0))

    const areNotInRequests = (userID: string) =>
      !user?.sentFriendRequests.includes(userID) && !user?.receivedFriendRequests.includes(userID)


    const filteredDocument = document.filter(userDoc => notFriendsOfCurrentUser(userDoc.friends) && hasMutualFriends(userDoc.friends) && areNotInRequests(userDoc.id))
    filteredDocument.forEach((user) => usersWithMutualFriends.push(user))
  }


  if (isPending) (<div className="loader"></div>)
  if (error) (<p className="error">{error}</p>)

  return (
    <div className={`box ${theme}`}>
      <h2>People you may know</h2>
      {usersWithMutualFriends.length > 0 && <UserList users={usersWithMutualFriends} />}
      {usersWithMutualFriends.length === 0 && <h4 className='error'>No people with mutual friends!</h4>}
    </div>
  )
}
