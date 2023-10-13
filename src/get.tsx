import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function AuthenticatedAction() {
  const { isAuthenticated, user } = useAuth0();
console.log('YEH WE IN DIS')
let received
  useEffect(() => {
        if (user) {
          console.log("useffect");
    
          console.log("useffected");
          // Check if the user is authenticated
          const data = {
            username: user.name, // Access user information
          };
          console.log("data", data);
          async function get() {
            await fetch("https://www.roadsbible.com/api/settings/", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Data received:", data);
                received = data;
                // Handle the response data as needed
              })
              .catch((error) => {
                console.error(
                  "There was a problem with the fetch operation:",
                  error
                );
              });
            // Set the CSS variable for primary accent color
            document.documentElement.style.setProperty(
              "--ion-color-primary",
              received[0].fields.color
            );
            document.body.style.setProperty(
              "--ion-color-primary",
              received[0].fields.color
            );
          }

        get()
        }
  }, [isAuthenticated]);

  // You can return null or any UI elements you want here
  return null;
}

export default AuthenticatedAction;
