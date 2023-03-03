import { documentId } from "firebase/firestore"

//custom hooks
import { useAuthContext, useCollection } from "@hooks"

//types
import { CSSClassesState, UserDocument } from "@types"

//components
import { UserList } from "@features/user"
import { useRef } from "react"

interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export default function NavFriends({ friendsClass }: NavFriendsProps) {
    const { user } = useAuthContext()

    const friends: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]
    const friendsRef = useRef(friends)

    if (friends.length !== friendsRef.current.length) {
        friendsRef.current = friends
    }

    const { document, isPending, error } = useCollection<UserDocument>('users', [documentId(), 'in', friendsRef.current])

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