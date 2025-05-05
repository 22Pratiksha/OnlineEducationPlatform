import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use named import
// Install this if needed

// Function to check token validity
function isTokenValid(token) {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    return decodedToken.exp > currentTime; // Return true if token is still valid
  } catch (error) {
    return false; // If decoding fails, token is invalid
  }
}

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const storedToken = localStorage.getItem("token");

  console.log("Token from Redux:", token);
  console.log("Token from Local Storage:", storedToken);

  const validToken = token || storedToken;
  const isAuthenticated = isTokenValid(validToken);

  if (!isAuthenticated) {
    return children; // Allow access if token is invalid or doesn't exist
  } else {
    return <Navigate to="/dashboard/my-profile" />; // Redirect if valid token is found
  }
}

export default OpenRoute;
