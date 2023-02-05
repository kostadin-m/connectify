import { BrowserRouter, Routes, Route } from 'react-router-dom'

//custom hooks
import { useAuthContext } from './hooks/useAuthContext'
import { useThemeContext } from './hooks/useThemeContext'

//components
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import Messages from './pages/Messages'
import EditProfile from './pages/EditProfile'

//helpers
import { isUser } from './helpers/isUser'

//styles
import './App.css'

function App() {
  const { authIsReady, firebaseUser } = useAuthContext()
  const { theme } = useThemeContext()
  return (
    <div className={`App ${theme}`}>
      {!authIsReady ? <div className='spinner'>Loading...</div> :
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={firebaseUser ? <Home /> : <Login />} />
            <Route path='/signup' element={!firebaseUser ? <SignUp /> : <Home />} />
            <Route path='/login' element={!firebaseUser ? <Login /> : <Home />} />
            <Route path='/profile/:id' element={firebaseUser ? <ProfilePage /> : <Login />} />
            <Route path='/messages' element={firebaseUser ? <Messages /> : <Login />} />
            <Route path='/edit' element={firebaseUser ? <EditProfile /> : <Login />} />
          </Routes>
        </BrowserRouter>}
    </div>
  )
}

export default App
