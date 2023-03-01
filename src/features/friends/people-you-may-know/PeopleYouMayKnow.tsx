import { memo } from 'react'
import { documentId } from 'firebase/firestore'

//custom hooks
import { useAuthContext, useCollection, useThemeContext } from '@hooks'

//components
import { UserList } from '@features/ui'

//styles
import './PeopleYouMayKnow.css'


//types
import { UserDocument } from '@types'

function PeopleYouMayKnow() {
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
export default memo(PeopleYouMayKnow)