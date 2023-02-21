import { screen, render, getAllByText, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '../../../context/AuthContext'
import { ThemeContextProvider } from '../../../context/ThemeContext'
import Comments from '../components/Comments'
import { timeStamp } from '../../../firebase/config'
import { vi } from 'vitest'

const createdAt = timeStamp.fromDate(new Date('December 17, 1995 03:24:00'))

const photoURL = 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'

const comments = [{
    commentContent: 'Test',
    creatorID: 'dadada',
    createdAt: timeStamp.fromDate(new Date())
},
{
    commentContent: 'Test',
    creatorID: 'dadada',
    createdAt: timeStamp.fromDate(new Date())
}]

interface DocumentStateMock {
    document: {} | null,
    error: string | null,
    isPending: boolean

}

const documentStateMock = {
    document: {
        displayName: 'KKM',
        email: 'km@gmail.com',
        id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
        photoURL
    },
    isPending: false,
    error: null
} as DocumentStateMock

vi.mock('../../../hooks/firebase-hooks/useDocument', () => ({
    useDocument: () => {
        return documentStateMock
    }
}))

interface FirestoreStateMock {
    response: { document: {} | null, error: string | null, isPending: boolean }
    updateDocument: () => Promise<null>
}

const mockFirestoreDocument = { response: { document: null, error: null, isPending: false }, updateDocument: async () => null, } as FirestoreStateMock

vi.mock('../../../hooks/firebase-hooks/useFirestore', () => ({
    useFirestore: () => {
        return mockFirestoreDocument
    }
}))


const MockComponent = () => {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <ThemeContextProvider>
                    <Comments classname='show' theme='dark' post={{
                        postTitle: 'dadada', location: 'dadada', creatorID: 'JdpMEbNtzLPtYEDT14ndw2FigIf2', createdAt, comments,
                        photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/postPictures%2FYzdXAuIouVZf7oKyAZ2cxmJnGS22%2F16766463953256920079019286481272.jpg?alt=media&token=08018f70-aa10-47c7-9c2b-7095380a07fa',
                        likes: ['JdpMEbNtzLPtYEDT14ndw2FigIf2'],
                        id: 'BwRwbVnJ4qXE8OPSPB6i'
                    }} />
                </ThemeContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )

}


describe("Tests for Comments Component", async () => {
    it('should render two comments', async () => {
        render(<MockComponent />)

        const comments = screen.getAllByText(/Test/i)

        expect(comments.length).toBe(2)
    })

    it('should have the comment creator', async () => {
        render(<MockComponent />)

        const comments = screen.getAllByText(/KKM/i)

        expect(comments.length).toBe(2)
    })
    it('should have the creator profile picture and have the correct src', async () => {
        render(<MockComponent />)

        const profileImgCount = screen.getAllByAltText(/user icon/i)
        const singleProfileImage = screen.getAllByAltText(/user icon/i)[0] as HTMLImageElement

        expect(singleProfileImage.src).toContain(photoURL)
        expect(profileImgCount.length).toBe(2)

    })

    it('should change the button name when request is pending', async () => {
        mockFirestoreDocument.response.isPending = true
        render(<MockComponent />)

        const buttonWithLoadingText = screen.getByText(/Loading.../i)

        expect(buttonWithLoadingText).toBeInTheDocument()
    })

    it('should have an error paragraph with the error message', async () => {
        mockFirestoreDocument.response.error = "Test Error"
        mockFirestoreDocument.response.isPending = false

        render(<MockComponent />)

        const ErrorParagraph = screen.getByText(/Test Error/i)

        expect(ErrorParagraph).toBeInTheDocument()
    })
    it('should show what is typed on the input', async () => {
        mockFirestoreDocument.response.error = null
        mockFirestoreDocument.response.isPending = false

        render(<MockComponent />)

        const inputElement = screen.getByPlaceholderText(/Write a comment/i) as HTMLInputElement

        fireEvent.change(inputElement, { target: { value: 'Custom Comment' } })

        expect(inputElement.value).toBe('Custom Comment')
    })
    it('should clear the input when post comment is clicked', async () => {
        mockFirestoreDocument.response.error = null
        mockFirestoreDocument.response.isPending = false

        render(<MockComponent />)

        const inputElement = screen.getByPlaceholderText(/Write a comment/i) as HTMLInputElement
        fireEvent.change(inputElement, { target: { value: 'Custom Comment' } })

        const buttonElement = screen.getByText(/Post a comment/i)
        fireEvent.click(buttonElement)

        waitFor(() => expect(inputElement.value).toBe(''))
    })
})