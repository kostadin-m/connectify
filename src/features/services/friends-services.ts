import { createChatRoom } from "./chat-engine-services"
import { UserDocument, UserObject } from "@types"

interface friendsFunctionParams {
  user: UserObject | null
  friend: UserDocument
  updateDocument: (id: string, updates: UserDocument) => Promise<void>
}

export async function addFriend({ user, friend, updateDocument }: friendsFunctionParams) {
  const updatedFriendReceivedRequests = { receivedFriendRequests: [...friend.receivedFriendRequests, user?.id] } as UserDocument
  const updatedCurrentUserSentRequests = { sentFriendRequests: [...user?.sentFriendRequests!, friend.id] } as UserDocument

  await updateDocument(friend.id, updatedFriendReceivedRequests)
  await updateDocument(user?.id!, updatedCurrentUserSentRequests)
};


export async function acceptOrDenyRequest(type: 'accept' | 'deny', { user, friend, updateDocument }: friendsFunctionParams) {
  const updatedCurrentUserReceivedRequests = { receivedFriendRequests: user?.receivedFriendRequests.filter(id => id !== friend.id)! } as UserDocument
  const updatedFriendSentRequests = { sentFriendRequests: friend.sentFriendRequests.filter(id => id !== user?.id) } as UserDocument

  await updateDocument(user?.id!, updatedCurrentUserReceivedRequests)
  await updateDocument(friend?.id!, updatedFriendSentRequests)

  if (type === 'deny') return

  const updatedCurrentUserFriends = { friends: [...friend.friends, user?.id] } as UserDocument
  const updatedFriendFriends = { friends: [...user?.friends!, friend.id] } as UserDocument

  await updateDocument(friend.id, updatedCurrentUserFriends)
  await updateDocument(user?.id!, updatedFriendFriends)
  await createChatRoom(user!, friend)
}

export async function cancelRequest({ user, friend, updateDocument }: friendsFunctionParams) {
  const updatedCurrentUserSentRequests = { sentFriendRequests: user?.sentFriendRequests.filter(id => id !== friend.id)! } as UserDocument
  const updatedFriendReceivedRequests = { receivedFriendRequests: friend.receivedFriendRequests.filter(id => id !== user?.id) } as UserDocument

  await updateDocument(user?.id!, updatedCurrentUserSentRequests)
  await updateDocument(friend?.id!, updatedFriendReceivedRequests)
}

export async function removeFriend({ user, friend, updateDocument }: friendsFunctionParams) {
  const currentUserUpdatedFriendList = user?.friends.filter(userID => userID !== friend.id)
  const friendUpdatedFriendList = friend.friends.filter(userID => userID !== user?.id)

  await updateDocument(friend.id, { friends: friendUpdatedFriendList } as UserDocument)
  await updateDocument(user?.id!, { friends: currentUserUpdatedFriendList } as UserDocument)
}