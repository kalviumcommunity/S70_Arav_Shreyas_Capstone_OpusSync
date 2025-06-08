// AuthContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react"; // Added useRef
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { isPublicPath, AUTH_ROUTES } from "../routes/routePaths"; // Verify this path

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null); // Token starts as null

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);