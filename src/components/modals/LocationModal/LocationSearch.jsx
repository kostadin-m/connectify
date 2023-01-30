import { useState } from 'react';
import PlacesAutocomplete, {
} from 'react-places-autocomplete';

//icons
import Location from '../../../assets/location_icon.svg'

//styles
import styles from '../Modals.module.css'

export default function LocationSearch({ handleLocationSelect, theme }) {
    const [adress, setAdress] = useState('')

    return (
        <div>
            < PlacesAutocomplete
                value={adress}
                onChange={setAdress}
                onSelect={handleLocationSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className={`${styles.search} ${styles[theme]}`}>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                            })}
                        />
                        {loading && <div className={styles.loading}>Loading...</div>}
                        {!loading &&
                            suggestions.length > 0 && <div className={styles.dataResult}>
                                {suggestions.map(suggestion => {
                                    return (
                                        <>
                                            <div className={`${styles.dataItem} ${styles[theme]}`}>
                                                <div
                                                    {...getSuggestionItemProps(suggestion)}
                                                >   <img src={Location} alt='location img '></img>
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>}
                    </div>
                )}
            </PlacesAutocomplete >
        </div>
    )
}
