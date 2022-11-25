import jwtDecode from 'jwt-decode';

export const testing = true;
export const testingTranslations = testing;

const tokenEncoded = window.location.href.substring(window.location.href.indexOf("token=") + 6);
const port = jwtDecode(tokenEncoded).port;
const URL = "lantask.eu"; //window.location.hostname;

//https://nodejs02.lanhelpdesk.com
//173.212.231.78
const protectedREST = `https://${URL}:${port}`;
const localREST = `http://localhost:4000`;
const protectedSocket = `wss://${URL}:${port}`;
const localSocket = `ws://localhost:4000`;

export const REST_URL = testing ? localREST : protectedREST;
export const SOCKET_URL = testing ? localSocket : protectedSocket;