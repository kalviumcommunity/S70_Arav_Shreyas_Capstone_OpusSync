import { createContext, useContext, useState } from "react";

// Create a context to hold the token
const AuthContext = createContext(null);

// Provider component to wrap your app
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null); // Token starts as null

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the context in other components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}