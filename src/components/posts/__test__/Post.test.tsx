import { vi } from "vitest"
import Post from "../components/Post"
import { ThemeContextProvider } from "../../../context/ThemeContext"
import { AuthContext } from "../../../context/AuthContext"
import { BrowserRouter } from "react-router-dom"
import { timeStamp } from "../../../firebase/config"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { UserDocument } from "../../../types"


interface MockDocument {
    document: UserDocument | null,
    error: null | string,
    isPending: boolean
}
const mockFirestoreDocument = { response: { document: null, error: null, isPending: false }, updateDocument: async () => null, }

vi.mock('../../../hooks/firebase-hooks/useFirestore', () => ({
    useFirestore: () => {
        return mockFirestoreDocument
    }
}))

const mockDocument = { document: null, isPending: false, error: null } as MockDocument
vi.mock('../../../hooks/firebase-hooks/useDocument', () => ({
    useDocument: () => {
        return mockDocument
    }
}))

const MockedComponent = ({ id }: { id: string }) => {
    const createdAt = timeStamp.fromDate(new Date('December 17, 1995 03:24:00'))
    const userObject = {
        email: 'blabla@gmail.com',
        displayName: 'Bla Blaaa',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283',
        friends: [],
        location: 'Razlog',
        sentFriendRequests: [],
        receivedFriendRequests: [],
        id
    }
    return (
        <BrowserRouter>
            <AuthContext.Provider value={{ authIsReady: true, user: userObject, dispatch: (() => null) }}>
                <ThemeContextProvider>
                    <Post post={{
                        postTitle: 'dadada', location: 'dadada', creatorID: 'JdpMEbNtzLPtYEDT14ndw2FigIf2', createdAt, comments: [],
                        photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/postPictures%2FYzdXAuIouVZf7oKyAZ2cxmJnGS22%2F16766463953256920079019286481272.jpg?alt=media&token=08018f70-aa10-47c7-9c2b-7095380a07fa',
                        likes: ['JdpMEbNtzLPtYEDT14ndw2FigIf2'],
                        id: 'BwRwbVnJ4qXE8OPSPB6i'
                    }} />
                </ThemeContextProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}


describe('Testing post component', async () => {
    it('should not be liked if the post likes array doesnt contain the current id ', async () => {
        mockDocument.document = {
            displayName: 'KKM',
            email: 'km@gmail.com',
            id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'
        } as UserDocument

        render(<MockedComponent id='dadada' />)

        const likedImage = screen.queryByAltText('likes icon')
        const userLiked = screen.queryByAltText('liked icon')


        expect(likedImage).toBeInTheDocument()
        expect(userLiked).not.toBeInTheDocument()
    })
    it('should be liked if the post likes array contains the current id ', async () => {
        mockDocument.document = {
            displayName: 'KKM',
            email: 'km@gmail.com',
            id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'
        } as UserDocument

        render(<MockedComponent id='JdpMEbNtzLPtYEDT14ndw2FigIf2' />)

        const likedImage = screen.queryByAltText('likes icon')
        const userLiked = screen.queryByAltText('liked icon')


        expect(likedImage).not.toBeInTheDocument()
        expect(userLiked).toBeInTheDocument()
    })
    it('should contain the creator name and id', async () => {

        mockDocument.document = {
            displayName: 'KKM',
            email: 'km@gmail.com',
            id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'
        } as UserDocument

        render(<MockedComponent id='JdpMEbNtzLPtYEDT14ndw2FigIf2' />)

        const name = screen.queryByText('KKM') as HTMLAnchorElement
        expect(name.href).toContain('/profile/JdpMEbNtzLPtYEDT14ndw2FigIf2')
    }
    )
    it('should contain the creator name and id and the right image src', async () => {

        mockDocument.document = {
            displayName: 'KKM',
            email: 'km@gmail.com',
            id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'
        } as UserDocument
        render(<MockedComponent id='JdpMEbNtzLPtYEDT14ndw2FigIf2' />)

        const profileImage = screen.getByAltText(/profile-image/i) as HTMLImageElement

        expect(profileImage.src).toContain(mockDocument.document.photoURL)
    }
    )
    it('should not render the post if there is no creatorDatat', async () => {
        mockDocument.document = null
        render(<MockedComponent id='JdpMEbNtzLPtYEDT14ndw2FigIf2' />)

        const postComponent = screen.queryByTestId(/post/i)

        expect(postComponent).not.toBeInTheDocument()
    })
    it('should not render comments initially', async () => {
        mockDocument.document = {
            displayName: 'KKM',
            email: 'km@gmail.com',
            id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'
        } as UserDocument

        render(<MockedComponent id='JdpMEbNtzLPtYEDT14ndw2FigIf2' />)

        const comments = screen.queryByTestId(/comments/i)

        expect(comments).not.toBeInTheDocument()
    })
    it('should toggle the comments when clicked on comments icon', async () => {
        mockDocument.document = {
            displayName: 'KKM',
            email: 'km@gmail.com',
            id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'
        } as UserDocument

        render(<MockedComponent id='JdpMEbNtzLPtYEDT14ndw2FigIf2' />)

        const commentsIcon = screen.getByAltText(/comments icon/i) as HTMLImageElement

        fireEvent.click(commentsIcon)

        const comments = screen.queryByTestId(/comments/i)
        expect(comments).toBeInTheDocument()

        fireEvent.click(commentsIcon)

        expect(comments).toHaveClass('_hidden_5a7bc9')
    })
    it('should change the likes icon  when clicked on', async () => {
        mockDocument.document = {
            displayName: 'KKM',
            email: 'km@gmail.com',
            id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'
        } as UserDocument


        render(<MockedComponent id='adda' />)

        const likesIcon = screen.getByAltText(/likes icon/i) as HTMLImageElement

        fireEvent.click(likesIcon)

        waitFor(() => (expect(likesIcon.alt).toBe('liked icon')))

    })
}
)