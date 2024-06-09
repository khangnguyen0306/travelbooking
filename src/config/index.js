const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  ROOM_API_URL: import.meta.env.VITE_API_URL_ROOMLIST,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  // create fake token here
};

export const { API_URL, ROOM_API_URL, API_BASE_URL } = publicRuntimeConfig;

export default publicRuntimeConfig;
