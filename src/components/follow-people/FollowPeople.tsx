import { useThemeContext } from '../../hooks/useThemeContext'

//custom hooks
import { useCollection } from '../../hooks/useCollection'

//components
import FriendList from '../friends-widgets/components/FriendList'

//styles
import './FollowPeople.css'


//types
import { FriendsObject } from '../..//types'

export default function FollowPeople() {
  const { document, isPending, error } = useCollection<FriendsObject>('users')
  const { theme } = useThemeContext()


  return (
    <div className={`box ${theme}`}>
      <h2>People you may know</h2>
      {document && <FriendList theme={theme} friends={document} />}
    </div>
  )
}
