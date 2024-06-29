let user_token = typeof window !== 'undefined' && (window.localStorage.getItem("data") && window.localStorage.getItem("data") !== 'null') 
    ? JSON.parse(window.localStorage.getItem("data")).user_token
    : "";
let admin_token = typeof window !== 'undefined' && (window.localStorage.getItem("data") && window.localStorage.getItem("data") !== 'null') 
    ? JSON.parse(window.localStorage.getItem("data")).admin_token
    : "";

let baseUrl = "https://intent-alien-crisp.ngrok-free.app"

let adminUrl = `${baseUrl}/admin`
let userUrls = `${baseUrl}/user`
let appUrl = `${baseUrl}/api`

let headers = {
    Authorization: `Bearer ${admin_token ? admin_token : user_token ? user_token : ''}`,
    "Content-Type": "Application/json",
    'Accept': 'application/json',
    // 'Access-Control-Allow-Headers': '*, ngrok-skip-browser-warning',
    // "Access-Control-Allow-Headers" : "Content-Type",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE"
    // "ngrok-skip-browser-warning": true,
    // "token": `Bearer ${accessToken}`,
    // "Access-Control-Allow-Credentials": true,
}

let bypassHeaders = {
    Authorization: `Bearer ${admin_token ? admin_token : user_token ? user_token : ''}`,
    "Content-Type": "Application/json",
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*, ngrok-skip-browser-warning',
    "Access-Control-Allow-Origin": '*',
    "ngrok-skip-browser-warning": true,
    // "token": `Bearer ${accessToken}`,
    // "Access-Control-Allow-Credentials": true,
}

let config = {
    headers,
    params: null,
}


let bypassConfig = {
    headers: bypassHeaders,
    params: null,
}

export { adminUrl, userUrls, appUrl, config, bypassConfig };