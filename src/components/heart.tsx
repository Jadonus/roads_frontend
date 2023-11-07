import React, { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";
import { isauth } from "../pages/isauth";

const Hearticon = (props) => {
  const [isHearted, setHearted] = useState(false);
  console.log(props);
  function addToFavorites() {
    const data = {
      title: props.title, // Make sure props.title is an object with the correct properties.
      road: false,
      verse: props.verse,
      index: props.index,
      username: isauth.value,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("https://www.roadsbible.com/api/newfav/", requestOptions).then(
      (response) => {
        if (response.ok) {
          setHearted(true);
        }
      }
    );
  }

  return (
    <>
      {!isHearted ? (
        <IonButton onClick={addToFavorites}>
          <IonIcon icon={heartOutline} />
        </IonButton>
      ) : (
        <IonButton>
          <IonIcon icon={heart} />
        </IonButton>
      )}
    </>
  );
};

export default Hearticon;
