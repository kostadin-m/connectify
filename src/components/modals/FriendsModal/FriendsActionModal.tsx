//icons
import { UserDocument } from "../../../types";
import Close from "../../../assets/close_icon.svg";
import ModalWrapper from "../../common/ModalWrapper";

//styles
import styles from "./ActionModal.module.css";
import { useAuthContext } from "../../../hooks/firebase-hooks/useAuthContext";
import { useFirestore } from "../../../hooks/firebase-hooks/useFirestore";

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
            <h2>
                Are you sure you want to remove Udsadasdsadasdasdasdasdasdasdasser from
                your friends list?
            </h2>
            <p className={`${styles.warning} ${styles[theme]}`}>
                If you remove your friend you can add them again!
            </p>
            <div className={styles.buttonsContainer}>
                <button
                    onClick={() => removeFriend()}
                    className={`btn ${theme}`}>Remove Friend</button>
                <button
                    onClick={closeModal}
                    className={`btn ${theme}`}
                >
                    No
                </button>
            </div>
            <img
                className={`close-modal ${theme}`}
                onClick={closeModal}
                src={Close}
                alt="closeIcon"
            />
        </ModalWrapper>
    );
}
