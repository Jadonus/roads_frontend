import "../theme/variables.css";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonBadge,
  IonItem,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonNote,
  IonList,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
const response = await axios.get(
  "https://www.roadsbible.com/dj-rest-auth/user/",
  {
    params: {
      format: "json",
    },
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  }
);
console.log(response);

export default function Account() {
  const [success, setSuccess] = useState(null);
  async function reset() {
    const resett = await axios.post(
      "https://www.roadsbible.com/dj-rest-auth/password/reset/",
      { email: response.data.email }
    );
    console.log(resett.data);
    if (resett.data.detail === "Password reset e-mail has been sent.") {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle size="large">Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>Email: {response.data.email}</IonItem>

          <IonItem>Username: {response.data.username}</IonItem>
          <IonItem onClick={reset}>
            Reset Password{" "}
            {success === true ? (
              <IonBadge slot="end" color="success">
                Success
              </IonBadge>
            ) : (
              <IonBadge slot="end" color="danger">
                Not Sent
              </IonBadge>
            )}
          </IonItem>
          <IonNote>This will send an email with instructions.</IonNote>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
