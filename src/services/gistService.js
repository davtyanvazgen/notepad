import axios from 'axios';

export function getGists(successCallback) {
    return httpRequest('get')
}

export function createGist(data, successCallback) {
    axios.post();
}

export function deleteGist(id, successCallback) {
    axios.delete();
}

export function editGist(data, successCallback) {
    axios.patch();
}

function httpRequest(method, body) {
    return axios({
        method,
        body,
        url: 'https://api.github.com/gists/b7f378e3c1cb92774d0d8a681ccfc3a1',
        headers: {
            Authorization: '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',
        }
    });
}