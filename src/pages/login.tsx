import { IonIcon } from "@ionic/react";
import { square } from "ionicons/icons";

import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonToggle,
  IonItem,
  IonLabel,
  IonList,
  IonHeader,
  IonToolbar,
  IonSpinner,
  IonTitle,
  IonButton,
  IonBackButton,
  IonInput,
} from "@ionic/react";

import Axios from "axios";

const Login = () => {
  const [error, setError] = useState(undefined);
  // Initialize settings using localStorage or default values
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
        localStorage.setItem("token", response.data.key);
        localStorage.setItem("username", username);
        window.location.href = "/tabs/dashboard/";
      } else {
        if (response.data && response.data.non_field_errors) {
          setError(response.data.non_field_errors[0]);
        } else {
          setError("Login failed");
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
          <IonBackButton></IonBackButton>
          <IonTitle size="large">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList inset>
          <IonItem>
            <IonInput
              type="text"
              placeholder="Username"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
