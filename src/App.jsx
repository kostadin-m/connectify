import { useAuthContext } from './hooks/useAuthContext'
import { useThemeContext } from './hooks/useThemeContext'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//components
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import Messages from './pages/Messages'

//styles
import './App.css'
import EditProfile from './pages/EditProfile'

function App() {
  const { authIsReady, user } = useAuthContext()
  const { theme } = useThemeContext()
  return (
    <div className={`App ${theme}`}>
      {!authIsReady ? <div className='spinner'>Loading...</div> :
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/edit' element={<EditProfile />} />
          </Routes>
        </BrowserRouter>}
    </div>
  )
}

export default App
