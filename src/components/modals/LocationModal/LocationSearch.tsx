import { useState } from 'react';
import PlacesAutocomplete, { } from 'react-places-autocomplete';

//icons
import Location from '../../../assets/location_icon.svg'

//styles
import styles from '../Modals.module.css'

interface Props {
    handleLocationSelect: (location: string) => void
    theme: string
}

interface LocationObject {
    id?: string
    description: string
}

interface GoogleAPIProps {
    getInputProps: ({ ...InputProps }: { placeholder: string }) => object
    suggestions: LocationObject[]
    loading: boolean
}



export default function LocationSearch({ handleLocationSelect, theme }: Props) {
    const [adress, setAdress] = useState('')

    return (
        <div>
            < PlacesAutocomplete
                value={adress}
                onChange={setAdress}
                onSelect={handleLocationSelect}
            >
                {({ getInputProps, suggestions, loading }: GoogleAPIProps) => (
                    <div className={`${styles.search} ${styles[theme]}`}>
                        <input
                            {...getInputProps({ placeholder: 'Search Places ...', })} />
                        {loading && <div className={styles.loading}>Loading...</div>}

                        {!loading &&
                            suggestions.length > 0 && <div className={styles.dataResult}>
                                {suggestions.map(suggestion => {
                                    return (
                                        <>
                                            <div className={`${styles.dataItem} ${styles[theme]}`}>
                                                <div>
                                                    <img src={Location} alt='location img '></img>
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
