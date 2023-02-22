import { BrowserRouter } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"
import { ThemeContextProvider } from "../../../context/ThemeContext"
import PostForm from "../PostForm"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import ReactDOM from "react-dom"
import { vi } from "vitest"


const photoURL = 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283'

const MockComponent = () => {

    const userObject = {
        email: 'blabla@gmail.com',
        displayName: 'Bla Blaaa',
        photoURL,
        friends: [],
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
                        <PostForm />
                    </ThemeContextProvider>
                </AuthContext.Provider>
            </BrowserRouter>
        </>
    )
}





describe('Tests for Post Form', async () => {
    beforeAll(() => {
        ReactDOM.createPortal = vi.fn((element, node) => {
            return element
        }) as any
    })

    afterEach(() => {
        vi.clearAllMocks()
    })
    it('should render the name in the placeholder', async () => {
        render(<MockComponent />)

        const placeholder = screen.getByPlaceholderText(/What's on your mind Bla Blaaa?/i)

        expect(placeholder).toBeInTheDocument()
    })

    it('should render the correct profile image', async () => {
        render(<MockComponent />)

        const profileImage = screen.getByAltText(/user icon/i) as HTMLImageElement

        expect(profileImage).toBeInTheDocument()
        expect(profileImage.src).toContain(photoURL)
    })
    it('should open the location modal when clicked on location icon', async () => {
        render(<MockComponent />)

        const locationIcon = screen.getByAltText(/location icon/i) as HTMLImageElement

        fireEvent.click(locationIcon)

        const modalComponent = screen.findByTestId(/modal/i)


        waitFor(() => expect(modalComponent).toBeVisible())
    })

})