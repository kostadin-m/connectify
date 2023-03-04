//components
import ModalWrapper from '../modal-wrapper'

//icons
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
        <ModalWrapper title={`Where are you currently at, ${user?.displayName}?`} theme={theme} setViewModal={setShowLocationModal}>
            <LocationSearch theme={theme} handleLocationSelect={handleLocationSelect} />
        </ModalWrapper>

    )
}
