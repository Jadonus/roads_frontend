import React, { useState, useEffect, useRef } from 'react';
import './SnakeProgressBar.css'; // Adjust your CSS file name
import { IonToolbar, IonPage, IonTitle, IonContent, IonHeader } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";

function Myprogress() {
  const [progress, setProgress] = useState(0);
  const { user } = useAuth0();
  const textRef = useRef(null);
 let numver = 0
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

      fetch('https://www.roadsbible.com/api/gameify', requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setProgress(response.numverses);
          // Calculate the position of the text box
          const containerHeight = textRef.current.parentNode.offsetHeight;
          const textHeight = textRef.current.offsetHeight;
          const newPosition = (progress / 100) * (containerHeight - textHeight);
          textRef.current.style.transform = `translateY(-${100 - progress}%)`;
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
         <div className="text-box" ref={textRef}>
            <p>You have memorized <strong>{progress}</strong> verses! Keep Up the great work!</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Myprogress;
