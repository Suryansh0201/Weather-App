import {AsyncPaginate} from 'react-select-async-paginate';
import {useState as UseState} from 'react';
import { geoApiOptions, GEO_API_URL } from '../../api';
const Search = ({onSearchChange}) =>{

    const [search, setSearch]= UseState(null);

    const loadOptions = (inputValue) =>{
      
        return fetch(`${GEO_API_URL}/citie&namePrefix=${inputValue}`, geoApiOptions)
        .then(response => response.json())
        .then(response => {
            return{
                geoApiOptions: response.data.map((city) =>{
                    return{
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`
                }
            }
        )}
        })
        .catch((err) => console.error(err));
        };

    const handleOnChange = (searchData) =>{
         setSearch(searchData);
         onSearchChange(searchData);
    }

return(
    <AsyncPaginate 
       placeholder='Search for City'
       debounceTimeout={600}
       value={search}
       onChange={handleOnChange}
       loadOptions= {loadOptions}
    />
)
}

export default Search;