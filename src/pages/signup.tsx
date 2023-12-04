import { IonIcon, IonRouterLink } from "@ionic/react";
import { square } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./ExploreContainer.css";
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonToggle,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonHeader,
  IonToolbar,
  IonSpinner,
  IonTitle,
  IonButton,
  IonBackButton,
  IonInput,
} from "@ionic/react";

import Axios from "axios";

const Signup = () => {
  const [error, setError] = useState(undefined);
  // Initialize settings using localStorage or default values
  const [username, setUsername] = useState("");
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  const handleLogin = async () => {
    setLoad(true);
    try {
      const response = await Axios.post(
        "https://www.roadsbible.com/dj-rest-auth/registration/",
        {
          username: (Math.random() + 1).toString(36).substring(7),
          email: email,
          password1: password,
          password2: password2,
        }
      );

      if (response.status === 200 || 204) {
        history.push("/login/");
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
      } else if (error.response && error.response.data) {
        const errorFields = Object.keys(error.response.data);
        let errorMessage = "";
        errorFields.forEach((field) => {
          errorMessage += `${field}: ${error.response.data[field][0]}\n`;
        });
        setError(errorMessage);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem color="light">
            <IonInput
              type="text"
              placeholder="Email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
        </IonList>
        <IonList inset>
          <IonItem color="light">
            <IonInput
              type="password"
              placeholder="Password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>

          <IonItem color="light">
            <IonInput
              type="password"
              placeholder="Password Confirmation"
              value={password2}
              onIonInput={(e) => setPassword2(e.detail.value!)}
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
            Sign Up{load ? <IonSpinner></IonSpinner> : <></>}
          </IonButton>
        </IonList>
        <IonNote className="ion-padding">
          Already registered?{" "}
          <IonRouterLink routerLink="/login">Login</IonRouterLink>{" "}
        </IonNote>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
