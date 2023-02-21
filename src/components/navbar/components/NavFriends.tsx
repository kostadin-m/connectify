import { documentId } from "firebase/firestore"
import { useAuthContext } from "../../../hooks/firebase-hooks/useAuthContext"
import { useCollection } from "../../../hooks/firebase-hooks/useCollection"
import { CSSClassesState, UserDocument } from "../../../types"
import UserList from "../../common/UserList"

interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export const NavFriends = ({ friendsClass }: NavFriendsProps) => {
    const { user } = useAuthContext()

    const friends: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    const { document, isPending, error } = useCollection<UserDocument>('users', [documentId(), 'in', friends])

    return (
        <>
            <div className={`nav-friends ${friendsClass}`}>
                {document && document.length > 0 ? <UserList users={document} /> : <h4 className="error">No Friends</h4>}
                {isPending && <p>Loading...</p>}
                {error && <p className='error'>{error}</p>}
            </div>
        </>
    )

}