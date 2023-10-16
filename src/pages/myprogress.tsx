import React, { useState, useEffect, useRef } from "react";
import "./SnakeProgressBar.css"; // Adjust your CSS file name
import {
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonIcon,
  IonButton,
  IonHeader,
} from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import { share } from "ionicons/icons";
import Confetti from "react-confetti";
import { RefresherEventDetail } from "@ionic/react";
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
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }
  async function fetchData() {
    if (user) {
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

      await fetch("https://www.roadsbible.com/api/gameify", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setProgress(response.numverses);
          setProgressBarPosition(response.numverses);

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
  function sharee() {
    console.log(progress);
    const shareData = {
      title: "Roads",
      text: "I memorized " + progress + " bible verses!",
      url: "https://www.roadsbible.com",
    };

    // Share must be triggered by "user activation"
    navigator.share(shareData);
  }
  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
              {navigator.canShare ? (
                <IonButton fill="clear" onClick={sharee}>
                  <IonIcon
                    color="primary"
                    size="large"
                    style={{ marginBottom: "1rem" }}
                    icon={share}
                  />
                </IonButton>
              ) : (
                <span></span>
              )}
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Myprogress;
