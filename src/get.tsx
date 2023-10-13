import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function AuthenticatedAction() {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      // Run your function or code here after authentication
      // For example, you can make an API request, set up user data, etc.
      console.log("Authenticated, running your custom action");
    }
  }, [isAuthenticated]);

  // You can return null or any UI elements you want here
  return null;
}

export default AuthenticatedAction;
