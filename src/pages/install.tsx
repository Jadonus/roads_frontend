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
  IonCardSubtitle,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { shareOutline, ellipsisVertical } from "ionicons/icons";
function Install() {
  const [canInstall, setCanInstall] = useState(false);
let safari = navigator.userAgent.indexOf("Safari") > -1;

  var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  var Android = /Android/.test(navigator.userAgent);
  let PWA = window.matchMedia("(display-mode: standalone)").matches;
let header;
let content;

// Define the header
header = (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings" />
      </IonButtons>
      <IonTitle>Install Roads</IonTitle>
      <IonButtons slot="end"></IonButtons>
    </IonToolbar>
  </IonHeader>
);

// Define the content based on conditions
if (PWA) {
  content = (
    <IonItem>
      <h1>Horray! You Are installed!</h1>
    </IonItem>
  );
} else if (iOS && safari) {
  content = (
    <IonItem>
      <h3>
        To Install Roads, press the{" "}
        <IonIcon color="primary" icon={shareOutline}></IonIcon>{" "}
        button, Then press "Add To Home Screen"
      </h3>
    </IonItem>
  );
   } else if (iOS) {
    <IonItem>
    <h3>
     In order to install roads, please switch to the safari browser and come back to this page. 
    </h3>
  </IonItem>
} else if (Android) {
  content = (
    <IonItem>
      <h3>
        To Install Roads, press the{" "}
        <IonIcon icon={ellipsisVertical}></IonIcon> button, Then press
        "Add To Home Screen" You may also choose to press install if
        you see a prompt.
      </h3>
    </IonItem>
  );
} else {
  content = (
    <IonItem>
      <h3>
        Depending on the browser, you can press the download button on
        the URL bar, and then press install.
      </h3>
    </IonItem>
  );
}

return (
  <IonPage>
    {header}
    <IonContent>
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
      {content}
    </IonContent>
  </IonPage>
);
}

export default Install;
