import React, { useState, useEffect, useRef } from "react";
import "./SnakeProgressBar.css"; // Adjust your CSS file name
import {
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonIcon,
  IonBadge,
  IonHeader,
} from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import { share } from "ionicons/icons";
import Confetti from "react-confetti";

function Myprogress() {
  const [progress, setProgress] = useState(0);

  const [confet, setConfet] = useState(false);
  const { user } = useAuth0();
  const textRef = useRef(null);
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
      document.getElementById("mem").scrollIntoView({
        behavior: "smooth", // Optional: Add smooth scrolling for a polished effect
        block: "center",
      });
      // Scroll the window to the calculated Y-coordinate
    }
  }
  let da;
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
      fetch("https://www.roadsbible.com/api/gameify", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setProgress(response.numverses);
          setProgressBarPosition(response.numverses);
          response = da;
          if (response.numverses % 10) {
            console.log("sad...");
          } else {
            setConfet(true);

            console.log("🎉");
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
  function share() {
    const shareData = {
      title: "Roads",
      text: "I memorized " + da.numverses + "verses!",
      url: "https://www.roadsbible.com",
    };

    // Share must be triggered by "user activation"
    try {
      navigator.share(shareData);
    } catch (err) {}
  }
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">My Progress</IonTitle>
          </IonToolbar>
        </IonHeader>

        {confet ? (
          <>
            <Confetti
              height={window.innerHeight * 2.5}
              recycle={false}
            ></Confetti>{" "}
          </>
        ) : (
          ""
        )}

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
              great work!{" "}
              <IonBadge color="primary" onClick={share}>
                <IonIcon icon="share" />
              </IonBadge>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Myprogress;
