//components
import Friends from "../components/friends-widget/Friends"
import UserWidget from "../components/user-widget/UserWidget"
import Feed from "../components/posts/Feed"
import { useParams } from "react-router-dom"
import { useDocument } from "../hooks/firebase-hooks/useDocument"
import { UserDocument } from "../types"


export default function ProfilePage() {
    const { id } = useParams()

    const { document: user, error, isPending } = useDocument<UserDocument>('users', id!)


    if (isPending) return (<div className="loader"></div>)

    return (
        <div className="page">
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
