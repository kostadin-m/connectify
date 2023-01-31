//components
import FriendRequests from '../components/friends-widgets/Friends'
import PostForm from '../components/post-form/PostForm'
import UserWidget from '../components/user-widget/UserWidget'
import Feed from '../components/posts/Feed'
import FollowPeople from '../components/follow-people/FollowPeople'

export default function Home() {
    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget />
                <FriendRequests />
            </div>
            <div className='page-item'>
                <PostForm />
                <div className='mobile-people'>
                    <FollowPeople/>
                </div>
                <Feed />
            </div>
            <FollowPeople />
        </div>
    )
}
