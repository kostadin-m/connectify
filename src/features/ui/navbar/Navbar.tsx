import { Link } from 'react-router-dom'

//components
import GuestNavbar from './components/GuestNavbar'
import UserNavbar from './components/UserNavbar'

//custom hooks
import { useThemeContext, useAuthContext } from '@hooks'

//icons
import { LightModeIcon } from '@assets'

//styles
import './Navbar.css'
import { UserSearch } from '@features/user'

export default function Navbar() {
    const { theme, toggleTheme } = useThemeContext()
    const { user } = useAuthContext()

    return (
        <nav className={`navbar ${theme}`}>
            <ul className='navbar-content'>
                <li className='title'>
                    <Link to='/' >
                        <h2>connectify</h2>
                    </Link>
                    {user && <UserSearch />}
                </li>
                <li>
                </li>
                <li className='nav-item'>
                    <img className='light-mode' onClick={toggleTheme} src={LightModeIcon} alt='light mode icon' />
                </li>
                {user ? <UserNavbar theme={theme} user={user} /> : <GuestNavbar />}
            </ul>
        </nav>
    )
}
