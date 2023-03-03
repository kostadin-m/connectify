import { UserDocument } from "@types";
import axios from "axios";

export async function createChatRoom(user: UserDocument, otherUser: UserDocument) {
    const headers = {
        'project-id': 'cb4c38f1-a904-45fe-b638-a6b989f334bc',
        'user-name': user?.displayName,
        'user-secret': user?.id
    }
    const data = { 'usernames': [user?.displayName, otherUser.displayName], 'is_direct_chat': true }

    await axios.put('https://api.chatengine.io/chats/', data, {
        headers
    }
    )

}