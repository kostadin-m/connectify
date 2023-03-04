import { useState } from "react"

//types
import { UserDocument } from "@types"

//custom hooks
import { useAuthContext, useThemeContext, useFirestore } from "@hooks"


//icons
import { AcceptRequest, CloseIcon, FriendsIcon, RemoveFriends } from '@assets'

//utils
import { createChatRoom } from "@features/chats"

//components
import { FriendsActionModal } from "@features/ui"

interface UserActionButtonProps {
    friend: UserDocument
}

interface friendsFunctionParams {
    user: UserDocument
    friend: UserDocument
    updateDocument: (id: string, updates: UserDocument) => Promise<void>
}

export default function UserActionButton({ friend }: UserActionButtonProps) {
    const [showFriendsActionModal, setShowFriendsActionModal] = useState(false)

    const { user } = useAuthContext()
    const { theme } = useThemeContext()
    const { updateDocument, response } = useFirestore<UserDocument>('users')

    const isFriend = user?.friends.includes(friend.id)
    const hasRecievedFriendRequestFromOtherUser = user?.receivedFriendRequests.includes(friend.id)
    const hasFriendRequestFromCurrentUser = user?.sentFriendRequests.includes(friend.id)
    const notAFriendOfCurrentUser = !isFriend && !hasFriendRequestFromCurrentUser && !hasRecievedFriendRequestFromOtherUser

    const functionParams = { user, friend, updateDocument } as friendsFunctionParams

    return (
        <>
            {showFriendsActionModal && <FriendsActionModal setActionModal={setShowFriendsActionModal} theme={theme} friend={friend} />}

            {isFriend ?
                <img className="button" src={FriendsIcon} alt='friends icon'
                    onMouseOver={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = RemoveFriends}
                    onMouseOut={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = FriendsIcon}
                    onClick={() => setShowFriendsActionModal(true)} />
                : null}
            {hasRecievedFriendRequestFromOtherUser
                ?
                <>
                    <img
                        onClick={() =>
                            !response.isPending ? handleAcceptOrDenyRequests('accept', functionParams) : null}
                        className="button" src={AcceptRequest} alt='accept request icon' />
                    <img
                        onClick={() => !response.isPending ? handleAcceptOrDenyRequests('deny', functionParams) : null}
                        className="button" src={CloseIcon} alt='deny request icon' />
                </> : null}

            {hasFriendRequestFromCurrentUser
                ?
                <button
                    onClick={() => !response.isPending ? handleCancelRequests(functionParams) : null}
                    className={`btn ${theme}`}>{!response.isPending ? 'Cancel Request' : "Loading..."}
                </button> : null}

            {notAFriendOfCurrentUser && user?.id !== friend.id
                ?
                <button disabled={response.isPending}
                    onClick={() => handleAddFriend(functionParams)}
                    className={`btn ${theme}`}>{response.isPending ? 'Loading...' : `Add Friend`}
                </button> : null}
        </>
    )
}

async function handleAddFriend({ user, friend, updateDocument }: friendsFunctionParams) {
    const updatedFriendReceivedRequests = { receivedFriendRequests: [...friend.receivedFriendRequests, user?.id] } as UserDocument
    const updatedCurrentUserSentRequests = { sentFriendRequests: [...user?.sentFriendRequests!, friend.id] } as UserDocument

    await updateDocument(friend.id, updatedFriendReceivedRequests)
    await updateDocument(user?.id!, updatedCurrentUserSentRequests)
};

async function handleAcceptOrDenyRequests(type: 'accept' | 'deny', { user, friend, updateDocument }: friendsFunctionParams) {
    const updatedCurrentUserReceivedRequests = { receivedFriendRequests: user?.receivedFriendRequests.filter(id => id !== friend.id)! } as UserDocument
    const updatedFriendSentRequests = { sentFriendRequests: friend.sentFriendRequests.filter(id => id !== user?.id) } as UserDocument

    await updateDocument(user?.id!, updatedCurrentUserReceivedRequests)
    await updateDocument(friend?.id!, updatedFriendSentRequests)

    if (type === 'deny') return

    const updatedCurrentUserFriends = { friends: [...friend.friends, user?.id] } as UserDocument
    const updatedFriendFriends = { friends: [...user?.friends!, friend.id] } as UserDocument

    await updateDocument(friend.id, updatedCurrentUserFriends)
    await updateDocument(user?.id!, updatedFriendFriends)
    await createChatRoom(user!, friend)
}

async function handleCancelRequests({ user, friend, updateDocument }: friendsFunctionParams) {
    const updatedCurrentUserSentRequests = { sentFriendRequests: user?.sentFriendRequests.filter(id => id !== friend.id)! } as UserDocument
    const updatedFriendReceivedRequests = { receivedFriendRequests: friend.receivedFriendRequests.filter(id => id !== user?.id) } as UserDocument

    await updateDocument(user?.id!, updatedCurrentUserSentRequests)
    await updateDocument(friend?.id!, updatedFriendReceivedRequests)
}