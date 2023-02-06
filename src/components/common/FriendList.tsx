import { Link } from "react-router-dom";

import Add from '../../../assets/add_friends.svg'
import Accept from "../../../assets/accept_request.svg";
import Deny from "../../../assets/close_icon.svg";
import Test from "../../../assets/test.jpg";
import { FriendsObject, UserDocument } from "../../types";
import { useThemeContext } from "../../hooks/view-hooks/useThemeContext";

interface Props {
  friends: UserDocument[] | FriendsObject[]
}

export default function FriendList({ friends }: Props) {
  const { theme } = useThemeContext()

  return (
    <div className='listFriends'>
      {friends.length === 0 ? <p>You dont Have any friends</p> :

        friends.map(friend => (
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
