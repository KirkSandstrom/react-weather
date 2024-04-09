export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
export const BACKEND_CONNECTION_STRING = BACKEND_PORT
  ? `${BACKEND_URL}:${BACKEND_PORT}`
  : BACKEND_URL;
