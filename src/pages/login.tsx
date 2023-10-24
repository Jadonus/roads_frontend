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
  IonTitle,
  IonButton,
  IonBackButton,
  IonInput,
} from "@ionic/react";

import Axios from "axios";

const Login = () => {
  // Initialize settings using localStorage or default values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await Axios.post(
        "https://www.roadsbible.com/dj-rest-auth/login/",
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200) {
        // Successful login, you can save the token or user info in local storage
        localStorage.setItem("token", response.data.key);

        localStorage.setItem("username", username);
        window.location.href = "/tabs/dashboard/";
        // Redirect to a protected page or update the app's state to consider the user as authenticated
      } else {
        // Handle login error
        console.log("Login failed");
      }
    } catch (error) {
      // Handle any network or request errors
      console.error(error);
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
      <IonContent color="">
        <IonList inset>
          <IonInput
            type="text"
            placeholder="Username"
            value={username}
            onIonInput={(e) => setUsername(e.detail.value!)}
          />
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
          />
          <IonButton expand="block" onClick={handleLogin}>
            Log In
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
