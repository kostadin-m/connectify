import { useParams } from "react-router-dom"

//components
import Friends from "../components/friends-widget/Friends"
import UserWidget from "../components/user-widget/UserWidget"
import Feed from "../components/posts/Feed"

//custom hooks
import { useDocument } from "../hooks/firebase-hooks/useDocument"


import { UserDocument } from "../types"


export default function ProfilePage() {
    const { id } = useParams()

    const { document: user, error, isPending } = useDocument<UserDocument>('users', id!)


    return (
        <div className="page">
            {isPending && <div className="loader"></div>}
            {error && <div className="error">{error}</div>}
            <div className="profile-page-item">
                {user && <>
                    <UserWidget user={user} />
                    <Friends friends={user.friends} />
                </>
                }
            </div>
            <div className="profile-page-item">
                <Feed id={id} />
            </div>

        </div >
    )
}
