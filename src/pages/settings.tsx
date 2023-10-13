import { IonIcon } from "@ionic/react";
import { colorPalette, logoGithub } from "ionicons/icons";
import { useAuth0 } from "@auth0/auth0-react";
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
  IonSelectOption,
  IonBackButton,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonButton,
  IonButtons,
  IonBadge,
} from "@ionic/react";
let colorPreference;
const SettingsPage = () => {
  
    const { user } = useAuth0();
  // Initialize settings using localStorage or default values
  async function settings(key, value) {
    let data = {
      username: user.name,
    };
    data[key] = value;

    let dato ={
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    await 
      fetch("https://www.roadsbible.com/api/settings/", dato)
      .then(response => {console.log('Api REsponse:',response)})
      .catch((err) => {
        console.error(err);
      });
  }

  // useEffect to save settings to localStorage whenever they change

  // Function to update settings

  const PWA = window.matchMedia("(display-mode: standalone)").matches;
  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"></IonButtons>
            <IonTitle>Settings</IonTitle>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Settings</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList inset={true}>
            <h3>General</h3>
            <IonItem>
              <IonSelect
                label="Default Memory Mode"
                aria-label="Default Memory Mode"
                interface="action-sheet"
                placeholder="Choose Mode"
                onIonChange={(e) => {
                  const selectedMode = e.detail.value || "randomWord";
                  settings("defaultmode", selectedMode);
                }}
              >
                <IonSelectOption value="randomWord">
                  Blurred Words
                </IonSelectOption>
                <IonSelectOption value="firstLetter">
                  First Letter
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <h3>Colors</h3>
            <IonItem>
              <IonRadioGroup
                value={colorPreference}
                onIonChange={(a) => {
                  settings("color", a.detail.value);
                  location.reload()
                }}
              >
                {/* Radio options */}

                <IonRadio value="#eb3434">
                  Red{" "}
                  <IonIcon icon={colorPalette} style={{ color: "#eb3434" }} />
                </IonRadio>
                <IonRadio value="#3875D2">
                  Blue (default){" "}
                  <IonIcon icon={colorPalette} style={{ color: "#3875D2" }} />
                </IonRadio>
                <IonRadio value="#3A936B">
                  Green{" "}
                  <IonIcon icon={colorPalette} style={{ color: "#3A936B" }} />
                </IonRadio>
                <IonRadio value="#9133FF">
                  Purple{" "}
                  <IonIcon icon={colorPalette} style={{ color: "#9133FF" }} />{" "}
                </IonRadio>
              </IonRadioGroup>
            </IonItem>
            <h3>App</h3>
            <IonItem routerLink="/settings/install">
              Install Roads{" "}
              {!PWA ? (
                <IonBadge slot="end" color="danger">
                  1
                </IonBadge>
              ) : (
                <div></div>
              )}
            </IonItem>

            <h3>Links</h3>
            <IonItem href="https://github.com/jadonus/roads_bible_vercel">
              <IonIcon icon={logoGithub} /> Backend Source Code
            </IonItem>
            <IonItem href="https://github.com/jadonus/roads_frontend">
              <IonIcon icon={logoGithub} /> Frontend Source Code
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default SettingsPage;
