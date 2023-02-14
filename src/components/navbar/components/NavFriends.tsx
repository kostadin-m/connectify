import { useAuthContext } from "../../../hooks/firebase-hooks/useAuthContext"
import { CSSClassesState, UserDocument } from "../../../types"
import UserList from "../../common/UserList"

interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export const NavFriends = ({ friendsClass }: NavFriendsProps) => {
    const { user } = useAuthContext()

    const friends: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    return (
        <>
            <div className={`nav-friends ${friendsClass}`}>
                {friends.length > 0 ? <UserList friendsIds={friends} /> : <h4 className="error">No Friends</h4>}
            </div>
        </>
    )

}