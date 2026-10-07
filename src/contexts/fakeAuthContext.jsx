/* eslint-disable react-refresh/only-export-components --
   Provider and its hook live in one file, which is the conventional React
   context layout; the cost is that fast refresh reloads this module fully. */
import { createContext, useContext, useEffect, useReducer } from "react";
import { DEMO_USER } from "../constants/demo";

const AuthContext = createContext();

const SESSION_KEY = "worldwise:session:v1";

// Reading synchronously in the initialiser avoids a flash of the login screen
// on reload, which would otherwise bounce you out of /app mid-demo.
function readSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user?.email ? user : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  try {
    if (user) window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage blocked (private browsing): the session simply won't survive a
    // reload, which is no worse than the previous in-memory behaviour.
  }
}

function init() {
  const user = readSession();
  return { user, isAuthenticated: Boolean(user), error: "" };
}

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { user: action.payload, isAuthenticated: true, error: "" };
    case "login/failed":
      return { ...state, error: action.payload };
    case "logout":
      return { user: null, isAuthenticated: false, error: "" };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    undefined,
    init
  );

  useEffect(() => {
    writeSession(user);
  }, [user]);

  function login(email, password) {
    const emailMatches =
      email.trim().toLowerCase() === DEMO_USER.email.toLowerCase();

    if (emailMatches && password === DEMO_USER.password) {
      dispatch({ type: "login", payload: DEMO_USER });
      return true;
    }

    // Previously a wrong password did nothing at all, which just looked broken.
    dispatch({
      type: "login/failed",
      payload: "That email and password combination isn't right.",
    });
    return false;
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
