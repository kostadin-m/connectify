import { useEffect } from 'react'
import ReactDOM from 'react-dom'

//icons
import Close from '../../../../../assets/close_icon.svg'
import LocationSearch from '../../../../modals/LocationModal/LocationSearch'


export default function LocationModal({ setLocation, setShowLocationModal, theme }) {

    const handleLocationSelect = (location) => {
        setLocation(location)
        setShowLocationModal(false)
    }

    useEffect(() => {
        document.body.classList.add('active-modal')

        return () => {
            document.body.classList.remove('active-modal')
        }
    }, [])

    return ReactDOM.createPortal(
        <div className={`modal`}>
            <div className='overlay'>
                <div style={{ minHeight: '350px' }} className={`modal-content ${theme}`}>
                    <h2>Where are you currently at, User?</h2>
                    <LocationSearch theme={theme} handleLocationSelect={handleLocationSelect} />
                    <img className={`close-modal ${theme}`} onClick={() => setShowLocationModal(false)}
                        src={Close} alt='closeIcon' />
                </div>
            </div>
        </div>, document.getElementById('root')
    )
}
