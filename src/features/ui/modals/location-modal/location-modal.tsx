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
    changeLocation: (location: string) => void
    onModalClose: () => void
    theme: string
}

export default function LocationModal({ changeLocation, onModalClose, theme }: Props) {
    const { user } = useAuthContext()
    const [adress, setAdress] = useState('')
    const [locations, setLocations] = useState<readonly Suggestion[]>([])

    const onLocationListChange = (suggestions: readonly Suggestion[]) => setLocations(suggestions)

    const handleLocationSelect = (location: string) => {
        changeLocation(location)
        onModalClose()
    }

    return (
        <ModalWrapper title={`Where are you currently at, ${user?.displayName}?`} theme={theme} onModalClose={onModalClose}>
            <PlacesAutocomplete value={adress} onChange={setAdress} onSelect={(value: string) => handleLocationSelect(value)}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <WithAutoComplete adress={adress} suggestions={suggestions} loading={loading} onLocationListChange={onLocationListChange}>
                        <div className={`${styles.search} ${styles[theme]}`}>
                            <input {...getInputProps({
                                placeholder: 'Search Places ...'
                            })} />
                            {loading ? <div className={styles.loading}>Loading...</div> : null}
                            <div className={styles.dataResult}>
                                {locations.map(suggestion => (
                                    <div {...getSuggestionItemProps(suggestion)} className={`${styles.dataItem} ${styles[theme]}`}
                                        key={suggestion.index}>
                                        <img src={LocationIcon} alt='location img'></img>
                                        <span>{suggestion.description}</span>
                                    </div>))}
                            </div>
                        </div>
                    </WithAutoComplete>)}
            </PlacesAutocomplete >
        </ModalWrapper>
    )
}
