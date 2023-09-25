import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonItem,
  IonButtons,
  IonIcon,
  IonContent,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { shareOutline, ellipsisVertical } from "ionicons/icons";
function Install() {
  const [canInstall, setCanInstall] = useState(false);

  var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  var Android = /Android/.test(navigator.userAgent);
  let PWA = window.matchMedia("(display-mode: standalone)").matches;
  return (
    <IonPage>
<IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/settings" />
            </IonButtons>
            <IonTitle>Install Roads</IonTitle>
            <IonButtons slot="end">
            </IonButtons>
          </IonToolbar>
          </IonHeader>
      <IonContent>

        {PWA ? (
          <IonItem>
            <h1>Horray! You Are installed!</h1>
          </IonItem>
        ) : (
          <>
            <IonItem>
              <img
                src="https://dashboard.roadsbible.com/roads.png"
                style={{ width: "5em", margin: "3em" }}
              />
              <div>
                <h1>Roads</h1>
                <p>By Jadon Gearhart</p>
              </div>
            </IonItem>
            {iOS ? (
              <IonItem>
                <h3>
                  To Install Roads, press the{" "}
                  <IonIcon color="primary" icon={shareOutline}></IonIcon>{" "}
                  button, Then press "Add To Home Screen"
                </h3>
              </IonItem>
            ) : Android ? (
              <IonItem>
                <h3>
                  To Install Roads, press the{" "}
                  <IonIcon icon={ellipsisVertical}></IonIcon> button, Then press
                  "Add To Home Screen" You may also choose to press install if
                  you see a prompt.
                </h3>
              </IonItem>
            ) : (
              <IonItem>
                <h3>
                  Depending on the browser, you can press the download button on
                  the url bar, and then press install.
                </h3>
              </IonItem>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Install;
