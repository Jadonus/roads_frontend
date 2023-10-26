import React, { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
console.log("asdf");
function AuthenticatedAction() {
  const [username, setUsername] = useState(String);
  const checkName = async () => {
    const { value } = await Preferences.get({ key: "username" });
    setUsername(value);
  };

  checkName();
  console.log(username);

  let received;
  console.log("useffect");

  console.log("useffected");
  // Check if the user is authenticated

  async function get() {
    const data = {
      username: username, // Access user information
    };
    console.log("data", data);
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
        console.error("There was a problem with the fetch operation:", error);
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
  useEffect(() => {
    console.log("iuser", username);
    if (username !== null) {
      get();
    }
    console.log(username);
  }, [username]);

  // You can return null or any UI elements you want here
  return null;
}

export default AuthenticatedAction;
