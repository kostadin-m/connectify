import { UserDocument } from "@types";
import axios from "axios";

const PRIVATE_KEY = '60216072-4b9e-4ac8-b321-571aaf652fcb'
const PROJECT_ID = 'cb4c38f1-a904-45fe-b638-a6b989f334bc'

export async function createChatRoom(user: UserDocument, otherUser: UserDocument) {
	const headers = {
		'project-id': PROJECT_ID,
		'user-name': user?.displayName,
		'user-secret': user?.id
	}
	const data = { 'usernames': [user?.displayName, otherUser.displayName], 'is_direct_chat': true }

	await axios.put('https://api.chatengine.io/chats/', data, {
		headers
	}
	)
}
export async function createChatEngineUser({ email, displayName, id }: UserDocument, profileImg: File) {
	let formData = new FormData()
	formData.append("email", email);
	formData.append("username", displayName);
	formData.append("secret", id);
	formData.append("avatar", profileImg, profileImg.name);

	await axios.post("https://api.chatengine.io/users/", formData,
		{ headers: { "Private-Key": PRIVATE_KEY } })
}

interface UpdatedUserProps {
	email: string
	displayName: string
	image: File | null
}

export async function editChatEngineUser(currentUser: UserDocument, { email, displayName, image }: UpdatedUserProps) {
	let formData = new FormData()
	formData.append("email", email);
	formData.append("username", displayName);

	if (image) formData.append("avatar", image, image.name);

	await axios.patch(`https://api.chatengine.io/users/me/`, formData, {
		headers: {
			"Private-Key": PRIVATE_KEY,
			'user-name': currentUser.displayName,
			'user-secret': currentUser.id
		}
	})

}
