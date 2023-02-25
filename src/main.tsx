import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//context
import { AuthContextProvider } from './context/AuthContext'
import { ThemeContextProvider } from './context/ThemeContext'


//initializing google maps api
window.initMap = () => null
const gmapScriptEl = document.createElement(`script`)
gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwISLMUeCsjRFd3mgwAm8zdXQk-JwGzQ&libraries=places&callback=initMap`
document.querySelector(`body`)?.insertAdjacentElement(`beforeend`, gmapScriptEl)



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AuthContextProvider>,
)
