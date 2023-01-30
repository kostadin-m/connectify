//components
import FriendRequests from "../components/friends-widgets/Friends"
import UserWidget from "../components/user-widget/UserWidget"
import Feed from "../components/posts/Feed"


export default function ProfilePage() {
    return (
        <div className="page">
            <div className="profile-page-item">
                <UserWidget />
                <FriendRequests />
            </div>
            <div className="profile-page-item">
                <Feed />
            </div>

        </div >
    )
}
