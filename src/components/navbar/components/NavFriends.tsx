import { useAuthContext } from "../../../hooks/firebase-hooks/useAuthContext"
import { useCollection } from "../../../hooks/firebase-hooks/useCollection"
import { useThemeContext } from "../../../hooks/view-hooks/useThemeContext"
import { CSSClassesState, UserDocument } from "../../../types"
import FriendList from "../../common/FriendList"

interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export const NavFriends = ({ friendsClass }: NavFriendsProps) => {
    const { user } = useAuthContext()
    const { document } = useCollection<UserDocument>('users')
    return (
        <>
            <div className={`nav-friends ${friendsClass}`}>
                {document && <FriendList friends={document} />}
            </div>
        </>
    )

}