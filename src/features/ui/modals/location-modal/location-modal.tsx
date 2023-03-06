import PlacesAutocomplete, { Suggestion } from 'react-places-autocomplete'
import { useState } from 'react'

//custom hooks
import { useAuthContext } from '@features/hooks'

//components
import WithAutoComplete from '@features/ui/modals/location-modal/hocs/with-autocomplete'
import ModalWrapper from '../modal-wrapper'

//icons
import { LocationIcon } from '@assets'

//styles
import styles from './location-modal.module.css'

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<string>>
    setShowLocationModal: React.Dispatch<React.SetStateAction<boolean>>
    theme: string
}

export default function LocationModal({ setLocation, setShowLocationModal, theme }: Props) {
    const { user } = useAuthContext()
    const [adress, setAdress] = useState('')
    const [locations, setLocations] = useState<readonly Suggestion[]>([])

    const handleLocationSelect = (location: string) => {
        setLocation(location)
        setShowLocationModal(false)
    }

    return (
        <ModalWrapper title={`Where are you currently at, ${user?.displayName}?`} theme={theme} setViewModal={setShowLocationModal}>
            <PlacesAutocomplete value={adress} onChange={setAdress} onSelect={(value: string) => handleLocationSelect(value)}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <WithAutoComplete adress={adress} suggestions={suggestions} loading={loading} setLocations={setLocations}>
                        <div className={`${styles.search} ${styles[theme]}`}>
                            <input {...getInputProps({
                                placeholder: 'Search Places ...'
                            })} />
                            {loading ? <div className={styles.loading}>Loading...</div> : locations.length > 0 ?
                                <div className={styles.dataResult}>
                                    {locations.map(suggestion => (
                                        <div {...getSuggestionItemProps(suggestion)}
                                            key={suggestion.index}
                                            className={`${styles.dataItem} ${styles[theme]}`}>
                                            <div>
                                                <img src={LocationIcon} alt='location img'></img>
                                                <span>{suggestion.description}</span>
                                            </div>
                                        </div>))}
                                </div> : <div className={styles.dataResult}></div>}
                        </div>
                    </WithAutoComplete>)}
            </PlacesAutocomplete >
        </ModalWrapper>
    )
}
