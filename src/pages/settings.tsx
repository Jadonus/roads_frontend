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
  IonSelectOption,
  IonBackButton,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
} from "@ionic/react";

const SettingsPage = () => {
  // Initialize settings using localStorage or default values
  const [colorPreference, setColorPreference] = useState(() => {
    const storedColorPreference = localStorage.getItem("colorPreference");

    return storedColorPreference; // Default to blue if no preference is stored
  });

  const [pageRefreshed, setPageRefreshed] = useState(false);

  // useEffect to save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("colorPreference", colorPreference);
  }, [colorPreference, pageRefreshed]);
  let mode = "he";
  const [mode1, mode2] = useState(() => {});

  // Function to update settings

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton></IonBackButton>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
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
              <IonToggle>Save Progress</IonToggle>
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
                  Red <IonIcon icon={square} style={{ color: "#eb3434" }} />
                </IonRadio>
                <IonRadio value="#3875D2">
                  Blue (default){" "}
                  <IonIcon icon={square} style={{ color: "#3875D2" }} />
                </IonRadio>
                <IonRadio value="#33FF9B">
                  Green <IonIcon icon={square} style={{ color: "#33FF9B" }} />
                </IonRadio>
                <IonRadio value="#9133FF">
                  Purple <IonIcon icon={square} style={{ color: "#9133FF" }} />{" "}
                </IonRadio>
              </IonRadioGroup>
            </IonItem>
            <h3>App</h3>
            <IonItem href="/settings/install">Install Roads
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
