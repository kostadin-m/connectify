import { useAuthContext } from "../../../hooks/firebase-hooks/useAuthContext"
import { CSSClassesState, UserDocument } from "../../../types"
import UserList from "../../common/UserList"

interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export const NavFriends = ({ friendsClass }: NavFriendsProps) => {
    const { user } = useAuthContext()
    return (
        <>
            <div className={`nav-friends ${friendsClass}`}>
                <UserList friendsIds={user?.friends!} />
            </div>
        </>
    )

}