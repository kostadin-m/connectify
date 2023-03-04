import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//custom hooks
import { useAuthContext, useThemeContext } from '@hooks'

//components
import { Navbar } from '@features/ui'
import Home from './pages/home'
import EditProfile from './pages/edit-profile'
import SignUp from './pages/sign-up'
import Login from './pages/login'
import ProfilePage from './pages/profile-page'
import Messages from './pages/messages'
import NotFound from './pages/not-found'


//styles
import './app.css'

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
