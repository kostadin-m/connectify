import { BrowserRouter } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"
import { ThemeContextProvider } from "../../../context/ThemeContext"
import PostForm from "../PostForm"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import ReactDOM from "react-dom"
import { vi } from "vitest"
import userEvent from '@testing-library/user-event'
import { useEffect, useState } from "react"


const photoURL = 'https://firebasestorage.googleapis.com/v0/b/my-s-1f4d4.appspot.com/o/thumbnails%2F6rwsEIfGG1fw3PzN7HxJQgtAh6V2%2F12359477-09D1-4128-91F9-AED8C985D733.jpeg?alt=media&token=ab328112-9654-4031-b4a1-bbb5561a4283'

const MockComponent = () => {

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {

        window.initMap = () => setLoaded(true)
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwISLMUeCsjRFd3mgwAm8zdXQk-JwGzQ&libraries=places&callback=initMap`
        document.querySelector(`body`)?.insertAdjacentElement(`beforeend`, gmapScriptEl)
    }, [])
    console.log(
        loaded
    )

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
            {loaded &&
                <BrowserRouter>
                    <AuthContext.Provider value={{ authIsReady: true, user: userObject, dispatch: (() => null) }} >
                        <ThemeContextProvider>
                            <PostForm />
                        </ThemeContextProvider>
                    </AuthContext.Provider>
                </BrowserRouter>
            }

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

        const placeholder = screen.queryByPlaceholderText(/What's on your mind Bla Blaaa?/i)

        waitFor(() => expect(placeholder).toBeInTheDocument())
    })

    it('should render the correct profile image', async () => {
        render(<MockComponent />)

        const profileImage = screen.queryByAltText(/user icon/i) as HTMLImageElement
        waitFor(() => {
            expect(profileImage).toBeInTheDocument()
            expect(profileImage.src).toContain(photoURL)
        })
    })
    it('should open the location modal when clicked on location icon', async () => {

        render(<MockComponent />)
        waitFor(() => {

            const locationIcon = screen.queryByAltText(/location icon/i) as HTMLImageElement

            fireEvent.click(locationIcon)

            const modalComponent = screen.findByTestId(/modal/i)
            waitFor(() => expect(modalComponent).toBeVisible())
        })


    })

    it('should show image preview when uploaded an image', async () => {
        render(<MockComponent />);
        waitFor(async () => {
            const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
            const inputFile = screen.getByTestId(/image input/i) as HTMLInputElement;
            await act(async () => {
                await waitFor(() => {
                    userEvent.upload(inputFile, fakeFile);
                });
            });
            const imagePreview = screen.queryByAltText(/image preview/i)

            waitFor(() => expect(imagePreview).toBeInTheDocument());
        })
    });
    it('should close image image preview when clicked close icon', async () => {
        const { getByTestId } = render(<MockComponent />);
        waitFor(async () => {
            const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
            const inputFile = getByTestId(/image input/i) as HTMLInputElement;
            await act(async () => {
                await waitFor(() => {
                    userEvent.upload(inputFile, fakeFile);
                });
            });

            const closeButton = screen.queryByAltText(/close icon/i) as HTMLDivElement
            const imagePreview = screen.queryByAltText(/image preview/i)

            await act(async () => {
                await waitFor(() => {
                    userEvent.click(closeButton)
                })
            })

            waitFor(() => expect(imagePreview).not.toBeInTheDocument());
        })
    });

})