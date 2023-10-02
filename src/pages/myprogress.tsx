import React, { useState, useEffect, useRef } from "react";
import "./SnakeProgressBar.css"; // Adjust your CSS file name
import {
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonHeader,
} from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import Confetti from 'react-confetti'

function Myprogress() {
  const [progress, setProgress] = useState(0);
  const { user } = useAuth0();
  const textRef = useRef(null);
let confet
  function setProgressBarPosition(progress) {
  // Ensure that textRef.current exists before accessing its parent
  if (textRef.current) {
    // Calculate the position of the text box
    const progressBarHeight = 250; // Assuming the progress bar covers 250% of the screen

    const newPosition =
      (progress / progressBarHeight) * progressBarHeight - 2;

    console.log("Progress:", progress);
    console.log("New Position:", newPosition);

    textRef.current.style.transform = `translateY(${newPosition}%)`;

    // Calculate the scroll position
    const windowHeight = window.innerHeight;
    const scrollToY = (progress / 100) * windowHeight;
    // Scroll the window to the calculated Y-coordinate
  }
}

  function fetchData() {
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
let confet = false
      fetch("https://www.roadsbible.com/api/gameify", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setProgress(response.numverses);
          setProgressBarPosition(response.numverses);

          if (response.numverses % 10) {
            confet = true
            console.log('🎉')
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("User or user.name is undefined.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">My Progress</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="vertical-progress-bar-container">
          <div className="progress-bars-container">
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
          <div className="text-box" ref={textRef}>
            <p id="mem">
              You have memorized <strong>{progress}</strong> verses! Keep up the
              great work!
            </p>
 {confet ? <Confetti></Confetti>: ''}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Myprogress;
