import { useState } from "react"

//types
import { UserDocument } from "@types"

//custom hooks and services
import { useAuthContext, useThemeContext, useFirestore } from "@features/hooks"
import { acceptOrDenyRequest, addFriend, cancelRequest } from "@features/services/friends-services"

//icons
import { AcceptRequest, CloseIcon, FriendsIcon, RemoveFriends } from '@assets'

//components
import { Button, FriendsActionModal } from "@features/ui"


interface UserActionButtonProps {
    friend: UserDocument
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

    const functionParams = { user, friend, updateDocument }

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
                            !response.isPending ? acceptOrDenyRequest('accept', functionParams) : null}
                        className="button" src={AcceptRequest} alt='accept request icon' />
                    <img
                        onClick={() => !response.isPending ? acceptOrDenyRequest('deny', functionParams) : null}
                        className="button" src={CloseIcon} alt='deny request icon' />
                </> : null}

            {hasFriendRequestFromCurrentUser
                ?
                <Button
                    disabled={response.isPending}
                    onClick={() => cancelRequest(functionParams)}
                    text={!response.isPending ? 'Cancel Request' : "Loading..."}
                    theme={theme} />
                : null}

            {notAFriendOfCurrentUser && user?.id !== friend.id
                ?
                <Button
                    disabled={response.isPending}
                    onClick={() => addFriend(functionParams)}
                    text={!response.isPending ? 'Add friend' : "Loading..."}
                    theme={theme} />
                : null}
        </>
    )
}