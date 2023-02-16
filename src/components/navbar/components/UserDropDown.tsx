import { useAuthContext } from '../../../hooks/firebase-hooks/useAuthContext'
import { useLogout } from '../../../hooks/firebase-hooks/useLogout'
import { useThemeContext } from '../../../hooks/view-hooks/useThemeContext'
import { CSSClassesState } from '../../../types'
import { Link } from 'react-router-dom'

interface UserDropDownProps {
    dropDownClass: CSSClassesState
}

export default function UserDropDown({ dropDownClass }: UserDropDownProps) {
    const { theme } = useThemeContext()
    const { user } = useAuthContext()

    const { logout, error, isPending } = useLogout()

    return (
        <div
            className={`user-dropdown-menu ${dropDownClass} ${theme}`}>
            <Link to={`/profile/${user?.id}`}>My Profile</Link>
            <Link to='/edit'>Edit Profile</Link>
            <button onClick={logout} >Logout</button>
            {error && <p className='error'>{error}</p>}
            {isPending && <div className='loader'></div>}
        </div>

    )
}
