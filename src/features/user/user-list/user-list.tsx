import { Link } from "react-router-dom";

import { useThemeContext, useCollection } from "@features/hooks";
import { memo } from "react";
import UserActionButton from "../../ui/buttons/user-action-button";

import styles from './user-list.module.css'
import { documentId } from "firebase/firestore";
import { UserDocument } from "@types";

interface Props {
    userIDS: string[]
    listSideways?: boolean
}

function UserList({ userIDS, listSideways = false }: Props) {
    const { theme } = useThemeContext()

    const { document, error, isPending } = useCollection<UserDocument>('users', [documentId(), 'in', userIDS])

    const sideways = listSideways ? styles.sideways : ''

    if (error) return (<h4 className="error">{error}</h4>)

    return (
        <div className={`${styles.listFriends} ${sideways}`}>
            {isPending && <h4>Loading...</h4>}
            {document && document.map(user => (
                <div key={user.id} className={`${styles.friend} ${sideways} ${styles[theme]}`}>
                    <img className="profile-image" src={user.photoURL!} alt="profile picture" />
                    <p className={`${styles.name} ${sideways}`}>{user.displayName}</p>
                    <Link to={`/profile/${user.id}`} />
                    <div className={`${styles.buttons} ${styles[theme]} ${sideways}`}>
                        <UserActionButton friend={user} />
                    </div>
                </div>
            ))}
        </div>
    );
}
export default memo(UserList)
