// Import necessary React hooks
import { useContext, createContext, useEffect, useState } from "react";

// Create a new Context for authentication state and functions
const AuthContext = createContext();

/**
 * AuthProvider component
 * Wraps your app and provides authentication data (user, login, logout, etc.)
 * to all components that need it through React Context.
 */
export const AuthProvider = ({ children }) => {
  // State to store the currently logged-in user
  const [user, setUser] = useState(null);

  // State to indicate whether the app is still checking for a saved user
  const [loading, setLoading] = useState(true);

  /**
   * useEffect runs once when the component mounts.
   * It tries to restore any saved user data from localStorage
   * so the user stays logged in even after refreshing the page.
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      // Convert JSON string back to an object and set it as the current user
      setUser(JSON.parse(savedUser));
    }

    // Mark loading as complete after checking localStorage
    setLoading(false);
  }, []);

  /**
   * Simulated login function
   * Normally, you'd make an API call here to verify user credentials.
   * For now, it just saves the user to localStorage and updates state.
   */
  const login = async (credentials) => {
    try {
      const fakeUser = { email: credentials.email };
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setUser(fakeUser);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  /**
   * Simulated signup function
   * Pretends to create a new user and save them locally.
   */
  const signup = async (data) => {
    try {
      const newUser = { email: data.email };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  /**
   * Logs the user out by clearing localStorage and resetting user state.
   */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  /**
   * Provide authentication data and functions to any component that consumes this context.
   * - user: current logged-in user (or null if not logged in)
   * - loading: indicates if we're still restoring from localStorage
   * - login, signup, logout: functions to manage authentication
   */
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to easily access the AuthContext values in any component.
 * Example: const { user, login, logout } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);

