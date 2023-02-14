import { Link } from "react-router-dom";


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
