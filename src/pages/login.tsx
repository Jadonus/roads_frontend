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
  IonSelect,
  IonButton,
  IonSelectOption,
  IonBackButton,
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  // Initialize settings using localStorage or default values

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  // Function to update settings
  useEffect(() => {
    // Check if the user is not authenticated
    if (!isAuthenticated) {
      // Perform automatic login
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    }
  }, [loginWithRedirect, isAuthenticated]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton></IonBackButton>
          <IonTitle size="large">Login/Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="">
        <div></div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
