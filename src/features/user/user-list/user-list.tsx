import { Link } from "react-router-dom";

import { UserDocument } from "../../../types";
import { useThemeContext } from "../../../hooks/view-hooks/use-theme-context";
import { memo } from "react";
import UserActionButton from "../../ui/buttons/user-action-button";

import styles from './user-list.module.css'

interface Props {
  users: UserDocument[]
  listSideways?: boolean
}

function UserList({ users, listSideways = false }: Props) {
  const { theme } = useThemeContext()

  const sideways = listSideways ? styles.sideways : ''

  return (
    <div className={`${styles.listFriends} ${sideways}`}>
      {document && users.map(user => (
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
