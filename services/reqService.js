const apiAddress = `${process.env.API_ADDRESS}:${process.env.API_PORT}`;
const defaultHeaders = new Headers({
    "Content-Type": "application/json",
    "Accept": "*",
    "Connection": "keep-alive"
})
/**
 * Makes a request to API. Receives the requisition url on path, the data, the req method and 
 * req headers (optional)
 * @constructor
 */
const DoRequest = async (endpoint, data, method, headers = defaultHeaders) => {
    let result = null;
    var requestConfig = {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    };
    return fetch(`${apiAddress}/${endpoint}`, {
        method: method,
        body: JSON.stringify(data),
        headers
    });
}

export default DoRequest;