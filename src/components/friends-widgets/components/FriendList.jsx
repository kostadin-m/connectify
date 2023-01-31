import { Link } from "react-router-dom";

import Add from '../../../assets/add_friends.svg'
import Accept from "../../../assets/accept_request.svg";
import Deny from "../../../assets/close_icon.svg";
import Test from "../../../assets/test.jpg";

export default function FriendList({ theme }) {
  return (
    <div className='listFriends'>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>
      <div className={`friend ${theme}`}>
        <img className="profile-image" src={Test} alt="profile picture" />
        <p className='name'>Kostadin Atanasov Majerski</p>
        <Link onClick={() => console.log("redirected")} to="/" />
        <div className={`buttons ${theme}`}>
          <button className={`btn ${theme}`}>Add Friend</button>
        </div>
      </div>

    </div>
  );
}
