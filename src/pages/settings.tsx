import { IonIcon } from "@ionic/react";
import { colorPalette, logoGithub } from "ionicons/icons";

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

const SettingsPage = () => {
  // Initialize settings using localStorage or default values
  const [dark, setDark] = useState(() => {
    // Use localStorage value if available, otherwise default to false
    const darkPreference = localStorage.getItem("dark");
    return darkPreference === "true"; // Convert string to boolean
  });
  const [colorPreference, setColorPreference] = useState(() => {
    const storedColorPreference = localStorage.getItem("colorPreference");

    return storedColorPreference;
  });

  const [pageRefreshed, setPageRefreshed] = useState(false);

  // useEffect to save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("colorPreference", colorPreference);
localStorage.setItem("dark", dark.toString());

  }, [colorPreference, pageRefreshed, dark]);
  let mode = "he";
  const [mode1, mode2] = useState(() => {});
  const toggleDarkMode = () => {
    // Update the state and save it to localStorage
    setDark((prevDark) => !prevDark);
localStorage.setItem("dark", (!dark).toString());


  };
  // Function to update settings

  const PWA = window.matchMedia("(display-mode: standalone)").matches;
  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
            </IonButtons>
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
                  localStorage.setItem("mode", selectedMode);
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
            <IonItem>
              <IonToggle
                checked={dark}
                onIonChange={toggleDarkMode}
  value={dark.toString()} // Convert boolean to string

              >
                Dark Mode{" "}
              </IonToggle>
            </IonItem>

            <h3>Colors</h3>
            <IonItem>
              <IonRadioGroup
                value={colorPreference}
                onIonChange={(e) => {
                  setColorPreference(e.detail.value);
                  // Reload the page only if it hasn't been refreshed before
                  if (!pageRefreshed) {
                    window.location.reload();
                    setPageRefreshed(true);
                  }
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
              <IonIcon icon={logoGithub}/>{' '} 
              Backend Source Code
            </IonItem>
<IonItem href="https://github.com/jadonus/roads_frontend">
              <IonIcon icon={logoGithub}/> Frontend Source Code
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default SettingsPage;
