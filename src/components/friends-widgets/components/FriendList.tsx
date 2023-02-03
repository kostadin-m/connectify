import { Link } from "react-router-dom";

import Add from '../../../assets/add_friends.svg'
import Accept from "../../../assets/accept_request.svg";
import Deny from "../../../assets/close_icon.svg";
import Test from "../../../assets/test.jpg";
import { FriendsObject } from "src/types";

interface Props {
  theme: string | null
  friends: FriendsObject[]
}

export default function FriendList({ theme, friends }: Props) {


  return (
    <div className='listFriends'>
      {friends.length === 0 ? <p>You dont Have any friends</p> :

        friends.map(friend => (
          <div className={`friend ${theme}`}>
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
