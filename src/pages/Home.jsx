//components
import FriendRequests from '../components/friends-widgets/Friends'
import PostForm from '../components/post-form/PostForm'
import UserWidget from '../components/user-widget/UserWidget'
import Feed from '../components/posts/Feed'

export default function Home() {
    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget />
                <FriendRequests />
            </div>
            <div className='page-item'>
                <PostForm />
                <Feed />
            </div>
        </div>
    )
}
