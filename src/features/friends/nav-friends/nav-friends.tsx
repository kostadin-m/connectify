import { documentId } from "firebase/firestore"

//custom hooks
import { useAuthContext, useCollection } from "@hooks"

//types
import { CSSClassesState, UserDocument } from "@types"

//components
import { UserList } from "@features/user"
import { useRef, useState } from "react"
import { getFriends } from "@features/friends/utils/get-friends"

interface NavFriendsProps {
    friendsClass: CSSClassesState
}

export default function NavFriends({ friendsClass }: NavFriendsProps) {
    const { user } = useAuthContext()

    const friendsIds: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    const [friends, setFriends] = useState<UserDocument[]>([])

    getFriends(friendsIds, setFriends)

    return (
        <div className={`nav-friends ${friendsClass}`}>
            {friends.length > 0 ? <UserList users={friends} /> : <h4 className="error">No Friends</h4>}
        </div>
    )

}