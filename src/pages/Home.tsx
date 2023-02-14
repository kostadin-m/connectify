//components
import Friends from '../components/friends-widget/Friends'
import PostForm from '../components/post-form/PostForm'
import UserWidget from '../components/user-widget/UserWidget'
import Feed from '../components/posts/Feed'
import FollowPeople from '../components/follow-people/FollowPeople'
import { useIsMobile } from '../hooks/view-hooks/useIsMobile'
import { useAuthContext } from '../hooks/firebase-hooks/useAuthContext'


export default function Home() {
    const [isMobile] = useIsMobile()
    const { user } = useAuthContext()

    const friends: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    console.log(isMobile)
    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget user={user!} />
                <Friends friends={friends!} />
            </div>
            <div className='page-item'>
                <PostForm />
                {isMobile && <FollowPeople />}
                <Feed />
            </div>
            {!isMobile && <FollowPeople />}
        </div>
    )
}
