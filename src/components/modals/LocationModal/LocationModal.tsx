//components
import ModalWrapper from '../../../components/common/ModalWrapper'

//icons
import Close from '../../../assets/close_icon.svg'
import LocationSearch from './LocationSearch'

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<string>>
    setShowLocationModal: React.Dispatch<React.SetStateAction<boolean>>
    theme: string
}


export default function LocationModal({ setLocation, setShowLocationModal, theme }: Props) {

    const handleLocationSelect = (location: string) => {
        setLocation(location)
        setShowLocationModal(false)
    }

    return (
        <ModalWrapper theme={theme}>
            <h2>Where are you currently at, User?</h2>
            <LocationSearch theme={theme} handleLocationSelect={handleLocationSelect} />
            <img className={`close-modal ${theme}`} onClick={() => setShowLocationModal(false)}
                src={Close} alt='closeIcon' />
        </ModalWrapper>

    )
}
