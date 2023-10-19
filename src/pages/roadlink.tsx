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
    fetch("www.roadsbible.com/api/getroad/", requestOption)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
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
      </IonPage>
    </>
  );
}
export default Roadlink;
