import { timeStamp } from '../../../firebase/config'
import Feed from '../feed/feed'
import { ThemeContextProvider } from '../../../context/theme-context'
import { AuthContextProvider } from '../../../context/auth-context'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'


interface Mock {
    document: object[] | null,
    error: null | string,
    isPending: boolean
}
interface MockDocument {
    document: {} | null,
    error: null | string,
    isPending: boolean
}


const mockDocument = {
    document: {
        displayName: 'KKM',
        email: 'km@gmail.com',
        id: 'JdpMEbNtzLPtYEDT14ndw2FigIf2',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2FJdpMEbNtzLPtYEDT14ndw2FigIf2%2FCBDB4D3E-1DD0-4107-992F-2EB4465F4ECF.jpeg?alt=media&token=6fb22e88-744e-4ba9-a6ae-3cdc2b0f1afb'

    }, isPending: false, error: null
} as MockDocument
const mock = { document: null, error: null, isPending: false } as Mock
vi.mock('../../../hooks/firebase-hooks/useCollection', () => ({
    useCollection: () => {
        return mock
    }
}))
vi.mock('../../../hooks/firebase-hooks/useDocument', () => ({
    useDocument: () => {
        return mockDocument
    }
}))

const createdAt = timeStamp.fromDate(new Date('December 17, 1995 03:24:00'))
const testPosts = [{
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
}]

const MockedComponent = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <ThemeContextProvider>
                    <Feed />
                </ThemeContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}
describe('Testing feed', async () => {
    it('should render two posts', async () => {
        mock.document = testPosts

        render(<MockedComponent />)

        const posts = screen.queryAllByTestId(/post/i)
        expect(posts.length).toBe(2)


    })

    it('should render the loader div and 0 posts', async () => {
        mock.document = null
        mock.isPending = true

        render(<MockedComponent />)

        const loader = screen.queryByTestId(/loader/i)
        const posts = screen.queryAllByTestId(/post/i)

        expect(loader).toBeInTheDocument()
        expect(posts.length).toBe(0)
    })
})