import { debounce } from "lodash";  

const refs = {
    input: document.getElementById('input-id'),
    countriesList: document.getElementById('countries'),
};

const debounceHandleInput = _.debounce(handleInput, 2000);

refs.input.addEventListener('input',  debounceHandleInput);


function handleInput(e) {
    const query = e.target.value;
    if (query) {
        fetch(`https://restcountries.eu/rest/v2/name/${query}`)
            .then((response) => {
                return response.json();
            })
            .then((countries) => {
                const countriesHtml = countries
                    .map((country) => `<h4>${country.name}</h4>`)
                    .join('');
                
                refs.countriesList.insertAdjacentHTML('afterbegin', countriesHtml);
            })
            .catch(console.error);
    }
}
