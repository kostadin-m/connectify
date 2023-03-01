import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { AuthContextProvider } from '../../../context/AuthContext'
import { ThemeContextProvider } from '../../../context/ThemeContext'
import { UserDocument } from '../../../types'
import UserWidget from '../user-widget/UserWidget'
import { render, screen, } from '@testing-library/react'
import { timeStamp } from '../../../firebase/config'
import { vi } from 'vitest'

interface mockedProps {
    userObject: UserDocument
}
const createdAt = timeStamp.fromDate(new Date())
const mock = {
    document: [
        {
            postTitle: 'dadada',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/postPictures%2FYzdXAuIouVZf7oKyAZ2cxmJnGS22%2F16766463953256920079019286481272.jpg?alt=media&token=08018f70-aa10-47c7-9c2b-7095380a07fa',
            location: 'dadada',
            creatorID: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            createdAt,
            comments: [],
            likes: [],
            id: 'BwRwbVnJ4qXE8OPSPB6i'
        }, {
            postTitle: 'dadada',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/postPictures%2FYzdXAuIouVZf7oKyAZ2cxmJnGS22%2F16766463953256920079019286481272.jpg?alt=media&token=08018f70-aa10-47c7-9c2b-7095380a07fa',
            location: 'dadada',
            creatorID: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            createdAt,
            comments: [],
            likes: [],
            id: '2OdQ5n4ZFRdslYJDjODB'
        }
    ], error: null, isPending: false
}
vi.mock('../../../hooks/firebase-hooks/useCollection', () => ({
    useCollection: () => {
        return mock
    }
}))
const MockedComponent = ({ userObject }: mockedProps) => {
    return (
        <AuthContextProvider>
            <ThemeContextProvider>
                <UserWidget user={userObject} />
            </ThemeContextProvider>
        </AuthContextProvider>
    )
}

describe('Render with empty location and 2 friends', async () => {

    const userObject = {
        email: 'blabla@gmail.com',
        displayName: 'Bla Bla',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283',
        friends: ['aa', 'aaa'],
        location: '',
        sentFriendRequests: [],
        receivedFriendRequests: [],
        id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2'
    }
    it('should render the the length of the friends array when passed down', async () => {
        render(< MockedComponent userObject={userObject} />)

        const friendsParagraph = screen.getByText(/2 friends/i)

        expect(friendsParagraph).toBeInTheDocument()
    })
    it('should render the location as "Not specified" when location string is empty ', async () => {
        render(< MockedComponent userObject={userObject} />)

        const friendsParagraph = screen.getByText(/Not specified/i)

        expect(friendsParagraph).toBeInTheDocument()
    })
    it('should render the displayName', async () => {
        render(< MockedComponent userObject={userObject} />)

        const friendsParagraph = screen.getByText(/Bla Bla/i)

        expect(friendsParagraph).toBeInTheDocument()
    })
})

describe('Render with location and 0 friends and 0 likes', async () => {

    const userObject = {
        email: 'blabla@gmail.com',
        displayName: 'Bla Blaaa',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283',
        friends: [],
        location: 'Razlog',
        sentFriendRequests: [],
        receivedFriendRequests: [],
        id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2'
    }
    it('should render the the length of the friends array when passed down', async () => {
        render(< MockedComponent userObject={userObject} />)

        const friendsParagraph = screen.getByText(/0 friends/i)

        expect(friendsParagraph).toBeInTheDocument()
    })
    it('should render the location as "Razlog" when location string is empty ', async () => {
        render(< MockedComponent userObject={userObject} />)

        const friendsParagraph = screen.getByText(/Razlog/i)

        expect(friendsParagraph).toBeInTheDocument()
    })
    it('should render the displayName', async () => {
        render(< MockedComponent userObject={userObject} />)

        const friendsParagraph = screen.getByText(/Bla Blaaa/i)

        expect(friendsParagraph).toBeInTheDocument()
    })
    it('should render 0 likes when loged in and should render error when signed out', async () => {
        render(< MockedComponent userObject={userObject} />)

        const likesParagraph = await screen.findByText(/0 likes/i)
        expect(likesParagraph).toBeInTheDocument()


    })
})

