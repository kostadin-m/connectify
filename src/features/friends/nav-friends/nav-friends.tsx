//custom hooks
import { useAuthContext } from "@hooks"

//types
import { CSSClassesState } from "@types"

//components
import { UserList } from "@features/user"


interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export default function NavFriends({ friendsClass }: NavFriendsProps) {
    const { user } = useAuthContext()

    const friendsIds: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    return (
        <div className={`nav-friends ${friendsClass}`}>
            <h2>Friend List</h2>
            {friendsIds.length > 0 ? <UserList userIDS={friendsIds} /> : <h4 className="error">No Friends</h4>}
        </div>
    )

}