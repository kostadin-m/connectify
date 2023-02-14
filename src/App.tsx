import { BrowserRouter, Routes, Route } from 'react-router-dom'

//custom hooks
import { useAuthContext } from './hooks/firebase-hooks/useAuthContext'
import { useThemeContext } from './hooks/view-hooks/useThemeContext'

//components
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import Messages from './pages/Messages'
import EditProfile from './pages/EditProfile'

//styles
import './App.css'

function App() {
  const { authIsReady, user } = useAuthContext()
  const { theme } = useThemeContext()

  return (
    <div className={`App ${theme}`}>
      {!authIsReady ? <div className='loader'></div> :
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={user ? <Home /> : <Login />} />
            <Route path='/signup' element={!user ? <SignUp /> : <Home />} />
            <Route path='/login' element={!user ? <Login /> : <Home />} />
            <Route path='/profile/:id' element={user ? <ProfilePage /> : <Login />} />
            <Route path='/messages' element={user ? <Messages /> : <Login />} />
            <Route path='/edit' element={user ? <EditProfile /> : <Login />} />
          </Routes>
        </BrowserRouter>}
    </div>
  )
}

export default App
