import { Link } from "react-router-dom";

import Add from '../../assets/add_friends.svg'
import Accept from '../../assets/accept_request.svg'
import Deny from "../../assets/close_icon.svg";
import { UserDocument } from "../../types";
import { useThemeContext } from "../../hooks/view-hooks/useThemeContext";
import { useCollection } from "../../hooks/firebase-hooks/useCollection";
import { documentId } from "firebase/firestore";
import { memo } from "react";
import UserActionButton from "./UserActionButton";

interface Props {
  friendsIds: string[]
}

function UserList({ friendsIds }: Props) {
  const { theme } = useThemeContext()
  const { document } = useCollection<UserDocument>('users', [documentId(), 'in', friendsIds])

  return (
    <div className='listFriends'>
      {document && document.length === 0 && <p>You dont Have any friends</p>}
      {document && document.map(friend => (
        <div key={friend.id} className={`friend ${theme}`}>
          <img className="profile-image" src={friend.photoURL!} alt="profile picture" />
          <p className='name'>{friend.displayName}</p>
          <Link to={`/`} />
          <div className={`buttons ${theme}`}>
            <UserActionButton friend={friend} />
          </div>
        </div>
      ))}
    </div>
  );
}
export default memo(UserList)
