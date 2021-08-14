import countriesTpl from '../templates/templateCountry.hbs';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

const debounce = require('lodash.debounce');  

const refs = {
    input: document.getElementById('input-id'),
    countriesList: document.getElementById('countries'),
};

refs.input.addEventListener('input',  debounce(handleInput, 500));


function handleInput(e) {
    const query = e.target.value;
    if (query) {
        fetch(`https://restcountries.eu/rest/v2/name/${query}`)
            .then((response) => {
                return response.json();
            })
            .then((countries) => { 
                if (country.length > 10) {
                     const countriesHtml = countries
                    .map((country) => `<h4>${country.name}</h4>`)
                    .join('');
                alert({
                   text: 'Notice me, senpai!'
                });                
                
                refs.countriesList.insertAdjacentHTML('afterbegin', countriesHtml);
                } else if (country.length === 1) {
                    const markup = countriesTpl(country);
                    refs.countriesList.innerHTML = markup;
                }         
                   
            })
            .catch(console.error);
    }
}

