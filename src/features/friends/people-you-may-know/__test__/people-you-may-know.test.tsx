import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../../../../context/auth-context'
import { ThemeContextProvider } from '../../../../context/theme-context'
import { UserDocument } from '@types'
import { vi } from 'vitest'
import PeopleYouMayKnow from '../people-you-may-know'


interface MockCollectionState {
    document: UserDocument[] | null
    error: null | string
    isPending: boolean
}

const users = [{
    email: 'blabla@gmail.com',
    displayName: 'Bla Blaaa',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283',
    friends: ['KM'],
    location: 'Razlog',
    sentFriendRequests: [],
    receivedFriendRequests: [],
    id: 'OtherGuy'
},
{
    email: 'blabla@gmail.com',
    displayName: 'Bla Blaaa',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283',
    friends: ['OtherGuy', 'JdpMEbNtzLPtYEDT14ndw2FigIf2'],
    location: 'Razlog',
    sentFriendRequests: [],
    receivedFriendRequests: [],
    id: 'KM'
}]


const mockCollectionState = { document: null, error: null, isPending: false } as MockCollectionState

vi.mock('../../../hooks/firebase-hooks/useCollection', () => ({
    useCollection: () => mockCollectionState
}))



const MockComponent = () => {
    const userObject = {
        email: 'blabla@gmail.com',
        displayName: 'Bla Blaaa',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283',
        friends: ['KM'],
        location: 'Razlog',
        sentFriendRequests: [],
        receivedFriendRequests: [],
        id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2'
    }
    return (
        <>
            <BrowserRouter>
                <AuthContext.Provider value={{ authIsReady: true, user: userObject, dispatch: (() => null) }} >
                    <ThemeContextProvider>
                        <PeopleYouMayKnow />
                    </ThemeContextProvider>
                </AuthContext.Provider>
            </BrowserRouter>

        </>
    )
}
describe('Test for People You May Know Component', async () => {

    it('should return an error "No People with mutual friends"', async () => {
        render(<MockComponent />)

        const errorMessage = screen.getByText(/No people with mutual friends!/i)

        expect(errorMessage).toBeInTheDocument()
    })

    it('should return a mutual friend with the name "Bla Blaa" and a button "Add friend"', async () => {
        mockCollectionState.document = users

        render(<MockComponent />)

        const mutualFriend = screen.getByText(/Bla Blaaa/i)
        const addFriendsButton = screen.getByText(/Add friend/i)

        expect(addFriendsButton).toBeInTheDocument()
        expect(mutualFriend).toBeInTheDocument()
    })
})