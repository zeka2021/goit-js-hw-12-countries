const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
    fetchArticles(query) {
        const reguestParams = `${query}`;
        return fetch(baseUrl + reguestParams).then(res => res.json());
    }
}