import React, { useState, useEffect, useRef } from "react";
import "./SnakeProgressBar.css"; // Adjust your CSS file name
import {
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonIcon,
  IonRow,
  IonModal,
  IonCol,
  IonButton,
  IonHeader,
  IonGrid,
  IonText,
  IonList,
} from "@ionic/react";
import { share, shareOutline } from "ionicons/icons";
import Confetti from "react-confetti";
import { RefresherEventDetail } from "@ionic/react";
import { isauth } from "./isauth";
import Verse from "./Verse";
import { effect } from "@preact/signals";
let username = isauth.value;
function Myprogress() {
  const [date, setDate] = useState(null);
  const [progress, setProgress] = useState(null);
  const [confet, setConfet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [verse, setVerse] = useState<string | null>(null);
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

      // Scroll the window to the calculated Y-coordinate
    }
  }
  let da;
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here

      location.reload();
      event.detail.complete();
    }, 2000);
  }
  async function fetchData(usernamee) {
    const data = {
      username: usernamee,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch("https://www.roadsbible.com/api/gameify/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setProgress(response.numverses);
        setVerse(response.lastroad);
        let d = new Date(response.lastdate);
        let da = `${d.getMonth() + 1}/${d.getDate()}`;
        setDate(da);
        console.log("%10", response.numverses % 10);
        if (response.numverses % 10 || response.numverses === "Not started") {
          console.log("sad...");
        } else {
          setConfet(true);

          console.log("🎉");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  effect(() => {
    fetchData(isauth.value);
  });
  function sharee() {
    console.log(progress);
    const shareData = {
      title: "Roads",
      text: "I memorized " + progress + " bible verses with this free app!",
      url: "https://www.roadsbible.com",
    };

    // Share must be triggered by "user activation"
    navigator.share(shareData);
  }
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Stats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

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
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem style={{ borderRadius: "1rem" }} color="light">
                {progress !== "Not Started" ? (
                  <div className="jus">
                    <h1 className="text-box">
                      <strong>{progress}</strong>
                    </h1>
                    <IonText className="be">Amount of Verses memorized</IonText>
                  </div>
                ) : (
                  <span className="be">
                    You have not memorized any verses! Head over to the
                    dashboard and start with a road.
                  </span>
                )}
                {navigator.canShare ? (
                  <IonButton fill="clear" onClick={sharee}>
                    <IonIcon
                      color="primary"
                      size="medium"
                      style={{ marginBottom: "1rem" }}
                      icon={shareOutline}
                    />
                  </IonButton>
                ) : (
                  <span></span>
                )}
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem style={{ borderRadius: "1rem" }} color="light">
                <div className="jus">
                  <h1 className="text-box">
                    <strong>{date}</strong>
                  </h1>
                  <IonText className="be">Last time you practiced</IonText>
                </div>
              </IonItem>
            </IonCol>
            {/*} <IonCol>
              <IonItem style={{ borderRadius: "1rem" }} color="light">
                <div className="jus">
                  <h1 className="text-box">
                    <strong></strong>
                  </h1>
                  <IonText className="be">Last time you practiced</IonText>
                </div>
              </IonItem>
                </IonCol>*/}
          </IonRow>
        </IonGrid>
        <IonList inset>
          <IonItem onClick={() => setIsOpen(true)} button color="light">
            Jump Back In to most recent road
          </IonItem>
        </IonList>
        <IonModal isOpen={isOpen}>
          <Verse
            index={undefined}
            dynamicPath={"/roads/" + verse}
            userr={false}
            onClose={closeModal}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Myprogress;
