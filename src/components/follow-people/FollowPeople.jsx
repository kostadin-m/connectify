import { useThemeContext } from '../../hooks/useThemeContext'

//components
import FriendList from '../friends-widgets/components/FriendList'

//styles
import styles from './FollowPeople.module.css'

export default function FollowPeople() {
    const {theme} = useThemeContext()

  return (
    <div className={`${styles.box} ${styles[theme]}`}>
        <h3>People you may know</h3>
        <FriendList theme={theme}/>
    </div>
  )
}
