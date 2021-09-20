const apiAddress = `${process.env.API_ADDRESS}:${process.env.API_PORT}`;
const setHeaderProp = (header, propName, propValue) => header[propName] = propValue;
import Store from "../redux/store/Store";
import * as ToasterActions from "../redux/actions/ToasterActions";

/**
 * Makes a request to API. Receives the requisition url on path, the data, the req method and 
 * req headers (optional)
 * @constructor
 */
const DoRequest = async (endpoint, data, method, hasAuth = true, headers = {}) => {

    var requestConfig = {
        method: method,
        headers: headers,
        body: null
    };

    if (method !== "GET")
        requestConfig.body = JSON.stringify(data);

    if (Object.entries(requestConfig.headers) == 0) {
        setHeaderProp(requestConfig.headers, "Content-Type", "application/json");
        setHeaderProp(requestConfig.headers, "Accept", "*");
        setHeaderProp(requestConfig.headers, "Connection", "keep-alive");
    }

    if (hasAuth) {
        setHeaderProp(requestConfig.headers, "Authorization",
            (sessionStorage)
                ? sessionStorage.getItem("token") + "UserName" + sessionStorage.getItem("username")
                : null);
    }

    let result = await fetch(`${apiAddress}/${endpoint}`, requestConfig);

    switch (result.status) {
        case 500:
            Store.dispatch(ToasterActions.PushToaster("error", result.body));
        case 401:
            Store.dispatch(ToasterActions.PushToaster("error", "User unauthorized."));
            break;
        default: return result;
    }

    return result;
}

export default DoRequest;