import { useState } from 'react'
import { Link } from 'react-router-dom'

//components
import GuestNavbar from './components/GuestNavbar'
import UserNavbar from './components/UserNavbar'

//custom hooks
import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'

//icons
import LightMode from '../../assets/light_mode_icon.svg'

//styles
import './Navbar.css'

export default function Navbar() {
    const [focusedSearch, setFocusedSearch] = useState<boolean>(false)

    const { theme, toggleTheme } = useThemeContext()
    const { user } = useAuthContext()
    return (
        <nav className={`navbar ${theme}`}>
            <ul className='navbar-content'>
                <li className='title'>
                    <Link to='/' >
                        <h2>mySocialMedia</h2>
                    </Link>
                    <div className={`input-wrapper ${focusedSearch ? 'focused' : ''}`}>
                        <input
                            className='nav-input' type='text' placeholder='Search Users'
                            onFocus={() => setFocusedSearch(true)}
                            onBlur={() => setFocusedSearch(false)}
                        />
                    </div>
                </li>
                <li>
                </li>
                <li className='nav-item'>
                    <img className='light-mode' onClick={toggleTheme} src={LightMode} alt='light mode icon' />
                </li>
                {user?.user ? <UserNavbar theme={theme} user={user} /> : <GuestNavbar />}
            </ul>
        </nav>
    )
}
