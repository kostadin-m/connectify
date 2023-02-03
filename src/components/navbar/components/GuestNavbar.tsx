import React from "react"
import { Link } from "react-router-dom"
import SignIn from '../../../assets/sign_in_icon.svg'
import Login from '../../../assets/login_icon.svg'

export default function GuestNavbar() {
  return (
    <>
      <li className='nav-item'>
        < Link className='guest-button' to='/signup' >
          <img src={SignIn} alt='sign in icon' />
          <p>Sign Up</p>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='guest-button' to='/login' >
          <img src={Login} alt='login'></img>
          <p>Login</p>
        </Link>
      </li>
    </>
  )

}
