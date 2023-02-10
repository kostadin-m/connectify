import { Link } from "react-router-dom";

import Add from '../../../assets/add_friends.svg'
import Accept from "../../../assets/accept_request.svg";
import Deny from "../../../assets/close_icon.svg";
import Test from "../../../assets/test.jpg";
import { UserDocument } from "../../types";
import { useThemeContext } from "../../hooks/view-hooks/useThemeContext";
import { useCollection } from "../../hooks/firebase-hooks/useCollection";
import { documentId } from "firebase/firestore";
import { memo } from "react";

interface Props {
  friendsIds: string[]
}

function FriendList({ friendsIds }: Props) {
  console.log(friendsIds)
  const { theme } = useThemeContext()
  const { document } = useCollection('users', [documentId(), 'in', friendsIds])

  return (
    <div className='listFriends'>
      {document && document.length === 0 && <p>You dont Have any friends</p>}
      {document && document.map(friend => (
        <div key={friend.id} className={`friend ${theme}`}>
          <img className="profile-image" src={friend.photoURL!} alt="profile picture" />
          <p className='name'>{friend.displayName}</p>
          <Link to={`/`} />
          <div className={`buttons ${theme}`}>
            <button className={`btn ${theme}`}>Add Friend</button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default memo(FriendList)
