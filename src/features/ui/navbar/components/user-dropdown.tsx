import { Link } from 'react-router-dom'

//custom hooks
import { useAuthContext, useLogout, useThemeContext } from '@features/hooks'
import { Dispatch, SetStateAction } from 'react'



export default function UserDropDown() {
  const { theme } = useThemeContext()
  const { user } = useAuthContext()


  const { logout, error, isPending } = useLogout()

  return (
    <div data-testid='drop-down' className={`user-dropdown-menu ${theme}`}>
      <Link to={`/profile/${user?.id}`}>My Profile</Link>
      <Link to='/edit'>Edit Profile</Link>
      <button onClick={logout} >Logout</button>
      {error && <p className='error'>{error}</p>}
      {isPending && <div className='loader'></div>}
    </div>

  )
}
