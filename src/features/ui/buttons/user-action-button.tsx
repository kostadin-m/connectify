import { useEffect, useState } from "react"
import axios from "axios"

//types
import { UserDocument } from "@types"

//custom hooks
import { useAuthContext, useThemeContext, useFirestore } from "@hooks"


//icons
import { AcceptRequest, CloseIcon, FriendsIcon, RemoveFriends } from '@assets'


//components
import { FriendsActionModal } from "@features/ui"

interface UserActionButtonProps {
    friend: UserDocument
}

export default function UserActionButton({ friend }: UserActionButtonProps) {
    const { user } = useAuthContext()
    const { theme } = useThemeContext()


    const { updateDocument, response } = useFirestore<UserDocument>('users')
    const [button, setButton] = useState<React.ReactNode>()
    const [showFriendsActionModal, setShowFriendsActionModal] = useState(false)

    const handleAddFriend = async () => {
        await updateDocument(friend.id, { receivedFriendRequests: [...friend.receivedFriendRequests, user?.id] } as UserDocument)
        await updateDocument(user?.id!, { sentFriendRequests: [...user?.sentFriendRequests!, friend.id] } as UserDocument)

    };

    const handleAcceptOrDenyActions = async (type: 'accept' | 'cancel') => {
        await updateDocument(user?.id!, { receivedFriendRequests: user?.receivedFriendRequests.filter(id => id !== friend.id)! } as UserDocument)
        await updateDocument(friend?.id!, { sentFriendRequests: friend.sentFriendRequests.filter(id => id !== user?.id) } as UserDocument)

        if (type === 'accept') {
            await updateDocument(friend.id, { friends: [...friend.friends, user?.id] } as UserDocument)
            await updateDocument(user?.id!, { friends: [...user?.friends!, friend.id] } as UserDocument)

            const headers = {
                'project-id': 'cb4c38f1-a904-45fe-b638-a6b989f334bc',
                'user-name': user?.displayName,
                'user-secret': user?.id
            }

            const data = { 'usernames': [user?.displayName, friend.displayName], 'is_direct_chat': true }

            await axios.put('https://api.chatengine.io/chats/', data, {
                headers
            }
            )
        }
    }

    const handleCancelRequests = async () => {
        await updateDocument(user?.id!, { sentFriendRequests: user?.sentFriendRequests.filter(id => id !== friend.id)! } as UserDocument)
        await updateDocument(friend?.id!, { receivedFriendRequests: friend.receivedFriendRequests.filter(id => id !== user?.id) } as UserDocument)
    }

    useEffect(() => {
        if (user?.id === friend.id) return setButton(null)

        if (user?.friends.includes(friend.id)) return setButton(
            <img className="button" src={FriendsIcon} alt='friends icon'
                onMouseOver={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = RemoveFriends}
                onMouseOut={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = FriendsIcon}
                onClick={() => setShowFriendsActionModal(true)} />
        )

        if (user?.receivedFriendRequests.includes(friend.id)) return setButton(
            <>
                <img
                    onClick={() =>
                        !response.isPending ? handleAcceptOrDenyActions('accept') : null}
                    className="button" src={AcceptRequest} alt='accept request icon' />
                <img
                    onClick={() => !response.isPending ? handleAcceptOrDenyActions('cancel') : null}
                    className="button" src={CloseIcon} alt='deny request icon' />
            </>
        )

        if (user?.sentFriendRequests.includes(friend.id)) return setButton(
            <button
                onClick={() => !response.isPending ? handleCancelRequests() : null}
                className={`btn ${theme}`}>{!response.isPending ? 'Cancel Request' : "Loading..."}
            </button>
        )

        if (!user?.friends.includes(friend.id)) return setButton(
            <button disabled={response.isPending}
                onClick={() => handleAddFriend()}
                className={`btn ${theme}`}>{response.isPending ? 'Loading...' : `Add Friend`}
            </button>)

    }, [user?.friends, user?.sentFriendRequests, user?.receivedFriendRequests, response])

    return (
        <div className={`buttons ${theme}`}>
            {showFriendsActionModal && <FriendsActionModal setActionModal={setShowFriendsActionModal} theme={theme} friend={friend} />}
            {button}
        </div>
    )
}
