import { UserDocument } from '../types'
import { documentId } from 'firebase/firestore'

//components
import Friends from '../components/friends-widget/Friends'
import PostForm from '../components/post-form/PostForm'
import UserWidget from '../components/user-widget/UserWidget'
import Feed from '../components/posts/Feed'
import PeopleYouMayKnow from '../components/people-you-may-know/PeopleYouMayKnow'

//custom hooks
import { useIsMobile } from '../hooks/view-hooks/useIsMobile'
import { useAuthContext } from '../hooks/firebase-hooks/useAuthContext'
import { useCollection } from '../hooks/firebase-hooks/useCollection'


export default function Home() {
    const [isMobile] = useIsMobile(1250)
    const { user } = useAuthContext()

    const friends: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    const { document, isPending, error } = useCollection<UserDocument>('users', [documentId(), 'in', friends])

    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget user={user!} />
                {document && <Friends isPending={isPending} friends={document} error={error} />}

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
