import { useState } from "react"
import { useParams } from "react-router-dom"

//components
import { Friends } from "@features/friends"
import { UserWidget } from "@features/user"
import { Feed } from "@features/posts"


//custom hooks
import { useDocument } from "@hooks"

//types
import { UserDocument } from "@types"

//utils
import { getFriends } from "@features/friends/utils/get-friends"


export default function ProfilePage() {
    const { id } = useParams()
    const { document: user, error, isPending } = useDocument<UserDocument>('users', id!)
    const [friends, setFriends] = useState<UserDocument[]>([])

    getFriends(user?.friends!, setFriends)

    return (
        <div className="page">
            {isPending && <div className="loader"></div>}
            {error && <div className="error">{error}</div>}
            <div className="profile-page-item">
                {user &&
                    <>
                        <UserWidget user={user} />
                        <Friends friends={friends} error={error} isPending={isPending} />
                    </>
                }
            </div>
            <div className="profile-page-item">
                <Feed id={id} />
            </div>

        </div >
    )
}
