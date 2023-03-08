import { useParams } from "react-router-dom"

//components
import { Friends } from "@features/friends"
import { UserWidget } from "@features/user"
import { Feed } from "@features/posts"

//custom hooks
import { useDocument } from "@features/hooks"

//types
import { UserDocument } from "@types"

export default function ProfilePage() {
	const { id } = useParams()

	const { document: user, error, isPending } = useDocument<UserDocument>('users', id!)

	return (
		<div className="page">
			{isPending && <div className="loader"></div>}
			{error && <div className="error">{error}</div>}
			<div className="profile-page-item">
				{user &&
					<>
						<UserWidget user={user} />
						{user && <Friends friendsIDS={user.friends} />}
					</>
				}
			</div>
			<div className="profile-page-item">
				<Feed id={id} />
			</div>
		</div >
	)
}
