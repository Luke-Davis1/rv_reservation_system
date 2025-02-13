export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  function login(token) {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return {loggedIn, login, logOut};
}