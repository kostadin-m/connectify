import { AuthContextProvider } from '../../../context/AuthContext'
import { ThemeContextProvider } from '../../../context/ThemeContext'
import UserWidget from '../UserWidget'
import { render, screen } from '@testing-library/react'

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

const MockedComponent = () => {
    return (
        <AuthContextProvider>
            <ThemeContextProvider>
                <UserWidget user={userObject} />
            </ThemeContextProvider>
        </AuthContextProvider>
    )
}


it('should render the the length of the friends array when passed down', async () => {
    render(< MockedComponent />)

    const friendsParagraph = screen.getByText(/2 friends/i)

    expect(friendsParagraph).toBeInTheDocument()
})
it('should render the location as "Not specified" when location string is empty ', async () => {
    render(< MockedComponent />)

    const friendsParagraph = screen.getByText(/Not specified/i)

    expect(friendsParagraph).toBeInTheDocument()
})
it('should render the displayName', async () => {
    render(< MockedComponent />)

    const friendsParagraph = screen.getByText(/Bla Bla/i)

    expect(friendsParagraph).toBeInTheDocument()
})
