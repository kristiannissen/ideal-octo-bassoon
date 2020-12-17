/**
 * @file search.js
 */
const getJSON = (keyword, callback) => {
    fetch(`/api/hop/${keyword}`)
        .then(resp => resp.json())
        .then(data => callback(data))
        .catch(err => console.log(err))
}

export function search(keyword, callback) {
    getJSON(keyword, callback)
}
