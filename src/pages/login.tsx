import { IonIcon } from "@ionic/react";
import "history";
import { square } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonHeader,
  IonToolbar,
  IonSpinner,
  IonTitle,
  IonNote,
  IonButton,
  IonInput,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import Axios from "axios";
import { Preferences } from "@capacitor/preferences";
const Login = () => {
  let history = useHistory();

  const [error, setError] = useState(undefined);
  const [username, setUsername] = useState("");
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    setLoad(true);
    try {
      const response = await Axios.post(
        "https://www.roadsbible.com/dj-rest-auth/login/",
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200) {
        await Preferences.set({
          key: "token",
          value: response.data.key,
        });
        await Preferences.set({
          key: "username",
          value: username,
        });
        history.push("/tabs/dashboard/");
      } else {
        if (response) {
          setError(response);
          setLoad(false);
        } else {
          setError("Login failed");

          setLoad(false);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setError(error.response.data.non_field_errors[0]);
      } else {
        setError("Login failed");
      }
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem color="light">
            <IonInput
              type="text"
              placeholder="Username"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>
          <IonItem color="light">
            <IonInput
              type="password"
              placeholder="Password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          {error !== undefined ? (
            <IonItem color="danger">{error}</IonItem>
          ) : (
            <></>
          )}
        </IonList>
        <IonList inset>
          <IonButton expand="block" onClick={handleLogin}>
            Log In {load ? <IonSpinner></IonSpinner> : <></>}
          </IonButton>
        </IonList>
        <IonNote className="ion-padding">
          {" "}
          Dont have an account? <a href="/signup">Sign up</a>{" "}
        </IonNote>
      </IonContent>
    </IonPage>
  );
};

export default Login;
