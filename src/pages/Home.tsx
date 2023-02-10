//components
import FriendRequests from '../components/friends-widget/Friends'
import PostForm from '../components/post-form/PostForm'
import UserWidget from '../components/user-widget/UserWidget'
import Feed from '../components/posts/Feed'
import FollowPeople from '../components/follow-people/FollowPeople'
import { useIsMobile } from '../hooks/view-hooks/useIsMobile'
import { useAuthContext } from '../hooks/firebase-hooks/useAuthContext'


export default function Home() {
    const [isMobile] = useIsMobile()
    const { user } = useAuthContext()

    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget user={user!} />
                <FriendRequests user={user!} />
            </div>
            <div className='page-item'>
                <PostForm />
                {isMobile && <FollowPeople />}
                <Feed id={null} />
            </div>
            {!isMobile && <FollowPeople />}
        </div>
    )
}
