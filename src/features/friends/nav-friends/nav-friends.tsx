//custom hooks
import { useAuthContext } from "@features/hooks"

//components
import { UserList } from "@features/user"

export default function NavFriends() {
  const { user } = useAuthContext()

  const friendsIds: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

  return (
    <div className={`nav-friends`}>
      <h2>Friend List</h2>
      {friendsIds.length > 0 ? <UserList userIDS={friendsIds} /> : <h4 className="error">No Friends</h4>}
    </div>
  )

}