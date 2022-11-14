export const testing = true;
const port = parseInt(process.env.REACT_APP_BACKEND_PORT);

export const testingTranslations = testing;
//https://nodejs02.lanhelpdesk.com
//173.212.231.78
const protectedREST = `https://${process.env.REACT_APP_BACKEND_BASE_URL}:${port}`;
const localREST = `http://localhost:4000`;
const protectedSocket = `wss://${process.env.REACT_APP_BACKEND_BASE_URL}:${port}`;
const localSocket = `ws://localhost:4000`;

export const REST_URL = testing ? localREST : protectedREST;
export const SOCKET_URL = testing ? localSocket : protectedSocket;