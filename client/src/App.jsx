import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth-context"; // Import AuthProvider
import SignIn from "./page/auth/SignIn";
import SignUp from "./page/auth/SignUp";
import GoogleOAuthFailure from "./page/auth/GoogleOAuthFailure";
import GoogleOAuthSuccess from "./page/auth/GoogleOAuthSuccess";
import WorkspaceDashboard from "./page/workspace/WorkspaceDashboard";
import Members from "./page/workspace/Members";
function App() {
  return (
    <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/google-oauth-failure" element={<GoogleOAuthFailure />} />
            <Route path="/google-oauth-success" element={<GoogleOAuthSuccess />} />
            <Route path="/workspace/:workspaceId" element={<WorkspaceDashboard />} />
            <Route path="/member/invite" element={<Members />} />
          </Routes>
        </div>
    </AuthProvider>
  );
}

export default App;