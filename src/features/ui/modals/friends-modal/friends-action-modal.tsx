// types
import { UserDocument } from "@types";

//icons
import { CloseIcon } from "@assets";

//custom hooks
import { useAuthContext, useFirestore } from "@hooks";

//components
import { Button, ModalWrapper } from "@features/ui";


//styles
import styles from "./friends-action-modal.module.css";

interface Props {
    setActionModal: React.Dispatch<React.SetStateAction<boolean>>
    theme: string
    friend: UserDocument
}

export default function FriendsActionModal({ setActionModal, theme, friend }: Props) {
    const { updateDocument, response } = useFirestore<UserDocument>('users')
    const { user } = useAuthContext()

    const closeModal = () => setActionModal(false);

    const removeFriend = async () => {

        const currentUserUpdatedFriendList = user?.friends.filter(userID => userID !== friend.id)
        const friendUpdatedFriendList = friend.friends.filter(userID => userID !== user?.id)

        await updateDocument(friend.id, { friends: friendUpdatedFriendList } as UserDocument)
        await updateDocument(user?.id!, { friends: currentUserUpdatedFriendList } as UserDocument)

        closeModal()

    }

    return (
        <ModalWrapper title={`Are you sure you want to remove ${friend.displayName} from your friends list?`} theme={theme}>
            {response.isPending && <div className='spinner'></div>}
            <p className={`${styles.warning} ${styles[theme]}`}>
                If you remove your friend you can add them again!
            </p>
            <div className={styles.buttonsContainer}>
                <Button text={response.isPending ? 'Loading...' : 'Remove friend'}
                    disabled={response.isPending} theme={theme} onClick={() => removeFriend()} />

                <Button disabled={false} text="No" theme={theme} onClick={() => closeModal()} />
            </div>
            <img
                className={`close-modal ${theme}`}
                onClick={closeModal}
                src={CloseIcon}
                alt="closeIcon"
            />
        </ModalWrapper>
    );
}
