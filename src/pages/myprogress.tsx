import React, { useState, useEffect } from 'react';
import './SnakeProgressBar.css';
import { IonToolbar, IonPage, IonTitle, IonContent, IonHeader} from "@ionic/react";

import { useAuth0 } from "@auth0/auth0-react";

  const { user } = useAuth0();

function Myprogress() {
  const [progress, setProgress] = useState(0);

 function set() {
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
     .then(response => console.log(response))
 }
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
    )

}
export default Myprogress