
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}

function fetchWarp( ) {
    //...Array.prototype.slice.call(arguments)
    fetch(...arguments)
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            console.log('request succeeded with JSON response', data)
        }).catch(function (error) {
            console.log('request failed', error)
        })
}
module.exports = fetchWarp;
