// src/App.jsx
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/auth-context";
import { SocketProvider } from './context/SocketContext';
import { OnlineUsersProvider } from './context/OnlineUsersContext';


class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Error: {this.state.error.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
         <OnlineUsersProvider>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      </OnlineUsersProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;