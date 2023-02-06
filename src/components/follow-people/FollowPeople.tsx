import { useThemeContext } from '../../hooks/view-hooks/useThemeContext'

//custom hooks
import { useCollection } from '../../hooks/firebase-hooks/useCollection'

//components
import FriendList from '../common/FriendList'

//styles
import './FollowPeople.css'


//types
import { UserDocument } from '../..//types'

export default function FollowPeople() {
  const { document, isPending, error } = useCollection<UserDocument>('users')
  const { theme } = useThemeContext()


  return (
    <div className={`box ${theme}`}>
      <h2>People you may know</h2>
      {document && <FriendList friends={document} />}
    </div>
  )
}
