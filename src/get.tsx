import React, { useEffect } from "react";

function AuthenticatedAction() {
  const getUsername = () => {
    // You'll want to fetch this from your authentication state or local storage
    // For example, if you're using local storage:
    return localStorage.getItem("username");
  };
  let username = getUsername();
  console.log(username);
  let received;
  useEffect(() => {
    if (username) {
      console.log("useffect");

      console.log("useffected");
      // Check if the user is authenticated
      const data = {
        username: username, // Access user information
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

      get();
    }
  }, []);

  // You can return null or any UI elements you want here
  return null;
}

export default AuthenticatedAction;
