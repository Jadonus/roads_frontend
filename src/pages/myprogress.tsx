import React, { useState, useEffect } from 'react';
import './SnakeProgressBar.css';
import { IonToolbar, IonPage, IonTitle, IonContent, IonHeader } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";

function Myprogress() {
  const [progress, setProgress] = useState(0);
  const { user } = useAuth0();

  function set() {
    // Check if user is defined before accessing its properties
    if (user && user.name) {
      const data = {
        username: user.name,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch('https://roadsbible.com/api/gameify', requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error("User or user.name is undefined.");
    }
  }

  useEffect(() => {
    set();
  }, []); // Added an empty dependency array to run the effect only once

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">My Progress</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="vertical-progress-bar-container">
          <div
            className="vertical-progress-bar"
            style={{
              height: `${progress}%`,
            }}
          ></div>
          <div
            className="vertical-progress-bar-unfilled"
            style={{
              height: `${100 - progress}%`,
            }}
          ></div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Myprogress;
