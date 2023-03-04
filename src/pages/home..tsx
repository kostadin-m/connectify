//custom hooks
import { useIsMobile, useAuthContext, useCollection } from '@hooks'

//components
import { PostForm, Feed } from '@features/posts'
import { UserWidget } from '@features/user'
import { Friends, PeopleYouMayKnow } from '@features/friends'


export default function Home() {
    const [isMobile] = useIsMobile(1250)
    const { user } = useAuthContext()

    const friendsIds: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget user={user!} />
                <Friends friendsIDS={friendsIds} />
            </div>
            <div className='page-item'>
                <PostForm />
                {isMobile && <PeopleYouMayKnow />}
                <Feed />
            </div>
            {!isMobile && <PeopleYouMayKnow />}
        </div>
    )
}
