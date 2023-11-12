import Cookies from "js-cookie";

const setAuthToken = (token) => {
  Cookies.set("jwtToken", token);
};

const getAuthToken = () => {
  return Cookies.get("jwtToken");
};

const removeAuthToken = () => {
  Cookies.remove("jwtToken");
};

export { setAuthToken, getAuthToken, removeAuthToken };
