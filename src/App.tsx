import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//custom hooks
import { useAuthContext } from './hooks/firebase-hooks/useAuthContext'
import { useThemeContext } from './hooks/view-hooks/useThemeContext'

//components
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProfilePage from './pages/ProfilePage'
import EditProfile from './pages/EditProfile'
import NotFound from './pages/NotFound'
import Messages from './pages/Messages'

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
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/profile/:id' element={user ? <ProfilePage /> : <Navigate to='/login' />} />
            <Route path='/edit' element={user ? <EditProfile /> : <Navigate to='/login' />} />
            <Route path='/messages' element={user ? <Messages /> : <Navigate to='/login' />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>}
    </div>
  )
}

export default App
