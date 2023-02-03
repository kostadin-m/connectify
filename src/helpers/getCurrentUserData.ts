import { User } from "firebase/auth";
import { DocumentSnapshot, } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { UserObject, IAuthUserObject } from "src/types";


//Gets the additional data like location, friends, friend requests and saves it into the AuthContext
export const getCurrentUserData = async (user: User | null) => {
    if (!user) {
        return null
    }
    const ref = doc(db, 'users', user.uid)
    const UserDataResponse = await getDoc(ref)
    const data = UserDataResponse.data() as UserObject

    return {
        ...user,
        sentFriendRequests: data.sentFriendRequests,
        friends: data.friends,
        receivedFriendRequests: data.receivedFriendRequests,
        location: data.location,
        online: data.online


    }
}