import { useRef } from 'react'
import { documentId } from 'firebase/firestore'

//types
import { UserDocument } from '@types'

//custom hooks
import { useIsMobile, useAuthContext, useCollection } from '@hooks'

//components
import { Friends, PostForm, UserWidget, Feed, PeopleYouMayKnow } from '../components'



export default function Home() {
    const [isMobile] = useIsMobile(1250)
    const { user } = useAuthContext()
    const friends: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    const friendsRef = useRef(friends)

    if (friends.length !== friendsRef.current.length) {
        friendsRef.current = friends
    }

    const { document, isPending, error } = useCollection<UserDocument>('users', [documentId(), 'in', friendsRef.current])

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
