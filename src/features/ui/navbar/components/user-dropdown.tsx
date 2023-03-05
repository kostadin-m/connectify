import { Link } from 'react-router-dom'

//custom hooks
import { useAuthContext, useLogout, useThemeContext } from '@features/hooks'
// types
import { CSSClassesState } from '@types'

interface UserDropDownProps {
    dropDownClass: CSSClassesState
}

export default function UserDropDown({ dropDownClass }: UserDropDownProps) {
    const { theme } = useThemeContext()
    const { user } = useAuthContext()

    const { logout, error, isPending } = useLogout()

    return (
        <div data-testid='drop-down' className={`user-dropdown-menu ${dropDownClass} ${theme}`}>
            <Link to={`/profile/${user?.id}`}>My Profile</Link>
            <Link to='/edit'>Edit Profile</Link>
            <button onClick={logout} >Logout</button>
            {error && <p className='error'>{error}</p>}
            {isPending && <div className='loader'></div>}
        </div>

    )
}
