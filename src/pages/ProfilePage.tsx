import { useParams } from "react-router-dom"

//components
import Friends from "../components/friends-widget/Friends"
import UserWidget from "../components/user-widget/UserWidget"
import Feed from "../components/posts/Feed"

//custom hooks
import { useDocument } from "../hooks/firebase-hooks/useDocument"


import { UserDocument } from "../types"
import { useEffect, useState } from "react"
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebase/config"


export default function ProfilePage() {
    const { id } = useParams()
    const { document: user, error, isPending } = useDocument<UserDocument>('users', id!)
    const [friends, setFriends] = useState<UserDocument[]>([])

    useEffect(() => {
        if (user) {
            const ref = query(collection(db, 'users'), where(documentId(), 'in', user?.friends))
            onSnapshot(ref, (snapshot) => {
                if (snapshot) {
                    const result = [] as UserDocument[]
                    snapshot.docs.forEach((doc) => {
                        result.push({ ...doc.data(), id: doc.id } as UserDocument)
                    })
                    setFriends(result)

                }
            })
        }
    }, [user])


    return (
        <div className="page">
            {isPending && <div className="loader"></div>}
            {error && <div className="error">{error}</div>}
            <div className="profile-page-item">
                {user && <>
                    <UserWidget user={user} />
                    <Friends friends={friends} error={error} isPending={isPending} />
                </>
                }
            </div>
            <div className="profile-page-item">
                <Feed id={id} />
            </div>

        </div >
    )
}
