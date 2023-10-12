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
  // Initialize settings using localStorage or default values
  async function settings(key, value) {
    const { user } = useAuth0();
    let data = {
      username: user.name,
      key: value,
    };
    await (data as any)
      .fetch("https://roadsbible.com/api/settings/", data)
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
                onIonChange={(e) => {
                  settings("color", e.detail.value);
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
