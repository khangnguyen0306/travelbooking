const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  ROOM_API_URL: import.meta.env.VITE_API_URL_ROOMLIST,
  // create fake token here
};

export const { API_URL, ROOM_API_URL } = publicRuntimeConfig;

export default publicRuntimeConfig;
