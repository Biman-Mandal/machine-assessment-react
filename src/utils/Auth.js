export const isAuthenticated = () => {
    const token = localStorage.getItem("auth_token");
    return !!token; // Returns true if token exists, otherwise false
};
  