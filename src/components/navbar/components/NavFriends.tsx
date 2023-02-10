import { useAuthContext } from "../../../hooks/firebase-hooks/useAuthContext"
import { CSSClassesState, UserDocument } from "../../../types"
import FriendList from "../../common/FriendList"

interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export const NavFriends = ({ friendsClass }: NavFriendsProps) => {
    const { user } = useAuthContext()
    return (
        <>
            <div className={`nav-friends ${friendsClass}`}>
                <FriendList friendsIds={user?.friends!} />
            </div>
        </>
    )

}