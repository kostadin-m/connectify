//components
import { ModalWrapper } from '@features/ui'

//icons
import { CloseIcon } from '@assets'
import LocationSearch from './location-search'
import { useAuthContext } from '@hooks'

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<string>>
    setShowLocationModal: React.Dispatch<React.SetStateAction<boolean>>
    theme: string
}


export default function LocationModal({ setLocation, setShowLocationModal, theme }: Props) {
    const { user } = useAuthContext()


    const handleLocationSelect = (location: string) => {
        setLocation(location)
        setShowLocationModal(false)
    }

    return (
        <ModalWrapper title={`Where are you currently at, ${user?.displayName}?`} theme={theme}>
            <LocationSearch theme={theme} handleLocationSelect={handleLocationSelect} />
            <img className={`close-modal ${theme}`} onClick={() => setShowLocationModal(false)}
                src={CloseIcon} alt='closeIcon' />
        </ModalWrapper>

    )
}
