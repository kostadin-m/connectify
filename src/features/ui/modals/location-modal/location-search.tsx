import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

//icons
import { LocationIcon } from '@assets'

//styles
import styles from '../modals.module.css'

interface Props {
    handleLocationSelect: (location: string) => void
    theme: string
}


export default function LocationSearch({ handleLocationSelect, theme }: Props) {
    const [adress, setAdress] = useState('')


    return (
        <div>

            < PlacesAutocomplete
                value={adress}
                onChange={setAdress}
                onSelect={(value: string) => handleLocationSelect(value)}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className={`${styles.search} ${styles[theme]}`}>
                        <input
                            {...getInputProps({ placeholder: 'Search Places ...', })} />
                        {loading && <div className={styles.loading}>Loading...</div>}

                        {!loading &&
                            suggestions.length > 0 &&
                            <div className={styles.dataResult}>
                                {suggestions.map(suggestion => {
                                    return (
                                        <div {...getSuggestionItemProps(suggestion)} key={suggestion.index} className={`${styles.dataItem} ${styles[theme]}`}>
                                            <div>
                                                <img src={LocationIcon} alt='location img '></img>
                                                <span>{suggestion.description}</span>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>}
                    </div>
                )}
            </PlacesAutocomplete >
        </div>
    )
}
