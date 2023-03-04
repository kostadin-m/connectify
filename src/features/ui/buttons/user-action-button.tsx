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

    await updateDocument(friend.id, { receivedFriendRequests: [...friend.receivedFriendRequests, user?.id] } as UserDocument)
    await updateDocument(user?.id!, { sentFriendRequests: [...user?.sentFriendRequests!, friend.id] } as UserDocument)

};

async function handleAcceptOrDenyRequests(type: 'accept' | 'deny', { user, friend, updateDocument }: friendsFunctionParams) {

    await updateDocument(user?.id!, { receivedFriendRequests: user?.receivedFriendRequests.filter(id => id !== friend.id)! } as UserDocument)
    await updateDocument(friend?.id!, { sentFriendRequests: friend.sentFriendRequests.filter(id => id !== user?.id) } as UserDocument)

    if (type === 'deny') return

    await updateDocument(friend.id, { friends: [...friend.friends, user?.id] } as UserDocument)
    await updateDocument(user?.id!, { friends: [...user?.friends!, friend.id] } as UserDocument)
    await createChatRoom(user!, friend)
}

async function handleCancelRequests({ user, friend, updateDocument }: friendsFunctionParams) {
    await updateDocument(user?.id!, { sentFriendRequests: user?.sentFriendRequests.filter(id => id !== friend.id)! } as UserDocument)
    await updateDocument(friend?.id!, { receivedFriendRequests: friend.receivedFriendRequests.filter(id => id !== user?.id) } as UserDocument)
}