import { Link } from "react-router-dom";

import { UserDocument } from "../../../types";
import { useThemeContext } from "../../../hooks/view-hooks/use-theme-context";
import { memo } from "react";
import UserActionButton from "../../ui/buttons/user-action-button";

interface Props {
  users: UserDocument[]
}

function UserList({ users }: Props) {
  const { theme } = useThemeContext()

  return (
    <div className='listFriends'>
      {document && users.map(user => (
        <div key={user.id} className={`friend ${theme}`}>
          <img className="profile-image" src={user.photoURL!} alt="profile picture" />
          <p className='name'>{user.displayName}</p>
          <Link to={`/profile/${user.id}`} />
          <UserActionButton friend={user} />
        </div>
      ))}
    </div>
  );
}
export default memo(UserList)
