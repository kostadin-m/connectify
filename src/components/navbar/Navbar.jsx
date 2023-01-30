import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'
//icons
import LightMode from '../../assets/light_mode_icon.svg'
import SearchIcon from '../../assets/search_icon.svg'

//styles
import './Navbar.css'
import GuestNavbar from './components/GuestNavbar'
import UserNavbar from './components/UserNavbar'


export default function Navbar() {
    const { theme, toggleTheme } = useThemeContext()
    const { user } = useAuthContext()
    return (
        <nav className={`navbar ${theme}`}>
            <ul className='navbar-content'>
                <li className='title'>
                    <Link to='/' >
                        <h2>mySocialMedia</h2>
                    </Link>
                    <div className='input-wrapper'>
                        <input className='nav-input' type='text' placeholder='Search Users' />
                        <img className='search-icon' src={SearchIcon} alt='search-icon' />
                    </div>
                </li>
                <li>
                </li>
                <li className='nav-item'>
                    <img className='light-mode' onClick={toggleTheme} src={LightMode} alt='light mode icon' />
                </li>
                {user ? <UserNavbar theme={theme} /> : <GuestNavbar />}
            </ul>
        </nav>
    )
}
