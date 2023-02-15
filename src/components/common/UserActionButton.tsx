import { useEffect, useState } from "react"
import axios from "axios"

//types
import { UserDocument } from "../../types"
//custom hooks
import { useAuthContext } from "../../hooks/firebase-hooks/useAuthContext"
import { useThemeContext } from "../../hooks/view-hooks/useThemeContext"
import { useFirestore } from "../../hooks/firebase-hooks/useFirestore"

//icons
import Accept from '../../assets/accept_request.svg'
import Deny from '../../assets/close_icon.svg'
import Friends from '../../assets/friends.svg'
import RemoveFriend from '../../assets/remove_friends.svg'

//components
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
