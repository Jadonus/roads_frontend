import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonPage,
  IonContent,
} from "@ionic/react";
import { useParams } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
function Roadlink() {
  const { userr, road } = useParams<{ userr: string; road: string }>();
  const { user } = useAuth0();
  const [description, setDescription] = useState();

  const [title, setTitle] = useState();
  async function get() {
    const dat = {
      username: user.name,
      usertoget: userr,
      road: road,
    };
    const requestOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dat),
    };

    try {
      const response = await fetch(
        "https://www.roadsbible.com/api/getroad/",
        requestOption
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Make sure to await this!

      console.log(data);
      setTitle(data.data[0].fields.title);
      setDescription(data.data[0].fields.verses[0].description);

      // Now your data should be defined.
    } catch (error) {
      console.error("Oops, something went wrong:", error);
    }
  }
  get();
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonBackButton />
            </IonButtons>
            <IonTitle>{userr + " - " + road}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            {title !== null && title !== undefined
              ? title + "-" + description
              : null}
          </IonItem>
        </IonContent>
      </IonPage>
    </>
  );
}
export default Roadlink;
