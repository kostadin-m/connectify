import { fireEvent, render, screen } from '@testing-library/react'
import { AuthContext } from "../../../context/auth-context"
import { ThemeContextProvider } from "../../../context/theme-context"
import Navbar from "../navbar"
import { BrowserRouter } from 'react-router-dom'

const MockedUserNavbar = () => {
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
    return (
        <>
            <BrowserRouter>
                <AuthContext.Provider value={{ authIsReady: true, user: userObject, dispatch: (() => null) }} >
                    <ThemeContextProvider>
                        <Navbar />
                    </ThemeContextProvider>
                </AuthContext.Provider>
            </BrowserRouter>
        </>
    )
}
const MockedGuestNavbar = () => {
    return (
        <>
            <BrowserRouter>
                <AuthContext.Provider value={{ authIsReady: true, user: null, dispatch: (() => null) }} >
                    <ThemeContextProvider>
                        <Navbar />
                    </ThemeContextProvider>
                </AuthContext.Provider>
            </BrowserRouter>

        </>
    )
}


describe('Testing Navbar when there is not user', () => {
    it('should have sign up and login anchor tags', async () => {

        render(<MockedGuestNavbar />);

        const signUpAnchor = screen.getByText(/Sign Up/i)
        const LoginAchor = screen.getByText(/Login/i)

        expect(LoginAchor).toBeInTheDocument()
        expect(signUpAnchor).toBeInTheDocument()
    })
    it('should not have search menu', async () => {

        render(<MockedGuestNavbar />);

        const searchMenu = screen.queryByPlaceholderText(/Search Users/i)

        expect(searchMenu).not.toBeInTheDocument()
    })
    it('should not have dropdown menu, messages', async () => {

        render(<MockedGuestNavbar />);

        const userNavItems = screen.queryAllByTestId(/user-nav/i)

        expect(userNavItems.length).toBe(0)
    })
})
describe('Testing Navbar when there is a user', async () => {

    it('should not have sign up and login anchor tags', async () => {

        render(<MockedUserNavbar />);

        const signUpAnchor = screen.queryByText(/Sign Up/i)
        const LoginAchor = screen.queryByText(/Login/i)

        expect(LoginAchor).not.toBeInTheDocument()
        expect(signUpAnchor).not.toBeInTheDocument()

    })
    it('should have dropdown menu, messages', async () => {

        render(<MockedUserNavbar />);

        const userNavItems = screen.queryAllByTestId(/user-nav/i)

        expect(userNavItems.length).toBe(2)
    })
    it('should have friends when screen is smaller than 800', async () => {
        window.innerWidth = 799
        render(<MockedUserNavbar />);

        const userNavItems = screen.queryAllByTestId(/user-nav/i)

        expect(userNavItems.length).toBe(3)
    })
    it('should  not have friends when screen is bigger than 800', async () => {
        window.innerWidth = 801
        render(<MockedUserNavbar />);

        const userNavItems = screen.queryAllByTestId(/user-nav/i)

        expect(userNavItems.length).toBe(2)
    })
    it('should have the right image ', async () => {
        render(<MockedUserNavbar />);

        const profileImg = screen.getByAltText(/navbar-profile-img/i) as HTMLImageElement


        expect(profileImg.src).
            toContain('https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283')
    })
})

describe('Testing userDropDown menu', async () => {
    it('should not be initially rendered', async () => {
        render(<MockedUserNavbar />)

        const dropDownMenu = screen.queryByTestId(/drop-down/i)

        expect(dropDownMenu).not.toBeInTheDocument()

    })

    it('should render the dropDownMenu when clicked on profile image', async () => {

        render(<MockedUserNavbar />)

        const profileImgButton = screen.getByAltText(/navbar-profile-img/i) as HTMLImageElement
        fireEvent.click(profileImgButton)


        const dropDownMenu = screen.queryByTestId(/drop-down/i)

        expect(dropDownMenu).toBeInTheDocument()
    })

})
