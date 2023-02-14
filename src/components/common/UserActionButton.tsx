import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/firebase-hooks/useAuthContext"
import { useThemeContext } from "../../hooks/view-hooks/useThemeContext"

import Accept from '../../assets/accept_request.svg'
import Deny from '../../assets/close_icon.svg'
import Friends from '../../assets/friends.svg'
import RemoveFriend from '../../assets/remove_friends.svg'
import { useFirestore } from "../../hooks/firebase-hooks/useFirestore"
import { UserDocument } from "../../types"
import FriendsActionModal from "../modals/FriendsModal/FriendsActionModal"

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
        const myUserUpdatedReceivedRequests: string[] = user?.receivedFriendRequests.filter(id => id !== friend.id)!
        const OtherUserUpdatedSentRequests: string[] = friend.sentFriendRequests.filter(id => id !== user?.id)

        await updateDocument(user?.id!, { receivedFriendRequests: myUserUpdatedReceivedRequests } as UserDocument)
        await updateDocument(friend?.id!, { sentFriendRequests: OtherUserUpdatedSentRequests } as UserDocument)

        if (type === 'accept') {
            await updateDocument(friend.id, { friends: [...friend.friends, user?.id] } as UserDocument)
            await updateDocument(user?.id!, { friends: [...user?.friends!, friend.id] } as UserDocument)
        }

    }

    const handleCancelRequests = async () => {
        const myUserUpdatedSentRequests: string[] = user?.sentFriendRequests.filter(id => id !== friend.id)!
        const OtherUserUpdatedReceivedRequests: string[] = friend.receivedFriendRequests.filter(id => id !== user?.id)

        await updateDocument(user?.id!, { sentFriendRequests: myUserUpdatedSentRequests } as UserDocument)
        await updateDocument(friend?.id!, { receivedFriendRequests: OtherUserUpdatedReceivedRequests } as UserDocument)
    }


    useEffect(() => {
        if (user?.friends.includes(friend.id)) setButton(
            <img className="button" src={Friends} alt='friends icon'
                onMouseOver={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = RemoveFriend}
                onMouseOut={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = Friends}
                onClick={() => setShowFriendsActionModal(true)} />)

        if (user?.receivedFriendRequests.includes(friend.id)) setButton(
            <>
                <img
                    onClick={() =>
                        !response.isPending ? handleAcceptOrDenyActions('accept') : null}
                    className="button" src={Accept} alt='accept request icon' />
                <img
                    onClick={() => !response.isPending ? handleAcceptOrDenyActions('cancel') : null}
                    className="button" src={Deny} alt='accept request icon' />
            </>)

        if (user?.sentFriendRequests.includes(friend.id)) setButton(
            <button
                onClick={() => !response.isPending ? handleCancelRequests() : null}
                className={`btn ${theme}`}>{!response.isPending ? 'Cancel Request' : "Loading..."}
            </button>)

        if (!user?.friends.includes(friend.id)
            && !user?.sentFriendRequests.includes(friend.id)
            && !user?.receivedFriendRequests.includes(friend.id))
            setButton(
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
