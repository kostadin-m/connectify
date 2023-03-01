import { Link } from "react-router-dom"

//components
import { SignInIcon, LoginIcon } from '@assets'

export default function GuestNavbar() {
  return (
    <>
      <li className='nav-item'>
        < Link className='guest-button' to='/signup' >
          <img src={SignInIcon} alt='sign in icon' />
          <p>Sign Up</p>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='guest-button' to='/login' >
          <img src={LoginIcon} alt='login'></img>
          <p>Login</p>
        </Link>
      </li>
    </>
  )

}
