import { useState } from 'react'


//types
import { UserDocument } from '@types'

//custom hooks
import { useIsMobile, useAuthContext, useCollection } from '@hooks'

//components
import { PostForm, Feed } from '@features/posts'
import { UserWidget } from '@features/user'
import { Friends, PeopleYouMayKnow } from '@features/friends'
import { getFriends } from '@features/friends/utils/get-friends'

export default function Home() {
    const [isMobile] = useIsMobile(1250)
    const { user } = useAuthContext()
    const [friends, setFriends] = useState<UserDocument[]>([])

    const friendsIds: string[] = [...user?.sentFriendRequests!, ...user?.receivedFriendRequests!, ...user?.friends!]

    getFriends(friendsIds, setFriends)

    return (
        <div className="page">
            <div className='page-item'>
                <UserWidget user={user!} />
                <Friends friends={friends} />

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
