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
import { Preferences } from "@capacitor/preferences";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { token } from "./isauth";
import { useHistory } from "react-router";
export default function Account() {
  let history = useHistory();
  const [response, setResponse] = useState({
    data: { username: "", email: "" },
  });
  const [success, setSuccess] = useState(null);
  async function get() {
    setResponse(
      await axios.get("https://www.roadsbible.com/dj-rest-auth/user/", {
        params: {
          format: "json",
        },
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          Authorization: `Token ${token.value}`,
        },
      })
    );
    console.log(response);
  }
  get();
  async function logOut() {
    await Preferences.clear();
    history.push("/login");
  }
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
          <IonItem color="light">Email: {response.data.email}</IonItem>

          <IonItem color="light">
            Username/ User id: {response.data.username}
          </IonItem>
          <IonItem button onClick={logOut} color="light">
            Logout
          </IonItem>
          <IonItem button color="light" onClick={reset}>
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
        </IonList>
        <IonNote>This will send an email with instructions.</IonNote>
      </IonContent>
    </IonPage>
  );
}
