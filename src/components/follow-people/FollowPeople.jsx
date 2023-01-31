import { useThemeContext } from '../../hooks/useThemeContext'

//components
import FriendList from '../friends-widgets/components/FriendList'

//styles
import './FollowPeople.css'
import '../friends-widgets/Friends.css'

export default function FollowPeople() {
  const { theme } = useThemeContext()

  return (
    <div className={`box ${theme}`}>
      <h2>People you may know</h2>
      <FriendList theme={theme} />
    </div>
  )
}
