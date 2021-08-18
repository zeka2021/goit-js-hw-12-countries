import fetchCountries from './fetch-Countries';
import refs from './refs';
import countriesTpl from '../templates/templateCountry.hbs';
import manyCountries from '../templates/templateMoreCountry.hbs';

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';


const debounce = require('lodash.debounce');



refs.input.addEventListener('input', debounce(handleInput, 500));


function handleInput(e) {
    e.preventDefault();
    clearCountriesList();
    const searchQuery = e.target.value;

    fetchCountries(searchQuery)
        .then(data => {
            console.log(data);
            if (data.length > 10) {
                alert({
                    text: " Too many matches found. Please enter a more specific query!"
                });
            }
            else if (data.status === 404) {
                alert({
                    text: "No country has been found. Please enter a more specific query!"
                });
            } else if (data.length === 1) {
                buildListMarkup(data, countriesTpl);
            } else if (data.length <= 10) {
                buildListMarkup(data, manyCountries);
            }
        })
        .catch(Error => {
            alert({
                text: "You must enter query parameters!"
            });
            console.log(Error);
        });

}
function buildListMarkup(countries, template) {
    const markup = countries.map(count => template(count)).join();
    refs.countriesList.insertAdjacentHTML('afterbegin', markup)
}


function clearCountriesList() {
    refs.countriesList.innerHTML = '';
}