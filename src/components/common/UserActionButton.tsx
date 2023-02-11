import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/firebase-hooks/useAuthContext"
import { useThemeContext } from "../../hooks/view-hooks/useThemeContext"

import Accept from '../../assets/accept_request.svg'
import Deny from '../../assets/close_icon.svg'
import { useFirestore } from "../../hooks/firebase-hooks/useFirestore"
import { UserDocument } from "../../types"

interface UserActionButtonProps {
    friend: UserDocument
}

export default function UserActionButton({ friend }: UserActionButtonProps) {
    const { user } = useAuthContext()
    const { theme } = useThemeContext()
    const { updateDocument, response } = useFirestore<UserDocument>('users')

    const handleAddFriend = async () => {
        await updateDocument(friend.id, { receivedFriendRequests: [...friend.receivedFriendRequests, user?.id] } as UserDocument)
        await updateDocument(user?.id!, { sentFriendRequests: [...user?.sentFriendRequests!, friend.id] } as UserDocument)
    };

    const [button, setButton] = useState<React.ReactNode>()

    useEffect(() => {
        if (user?.receivedFriendRequests.includes(friend.id)) setButton(<>
            <img className="button" src={Accept} alt='accept request icon' />
            <img className="button" src={Deny} alt='accept request icon' />
        </>)

        if (user?.sentFriendRequests.includes(friend.id)) setButton(<p>Pending...</p>)

        if (!user?.friends.includes(friend.id)
            && !user?.sentFriendRequests.includes(friend.id)
            && !user?.receivedFriendRequests.includes(friend.id))
            setButton(<button onClick={() => handleAddFriend()} className={`btn ${theme}`}>Add Friend</button>)
    }, [friend])





    return (
        <div className={`buttons ${theme}`}>
            {button}
        </div>
    )
}
