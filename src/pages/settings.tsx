import { IonIcon } from "@ionic/react";
import { colorPalette, logoGithub } from "ionicons/icons";
import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonPicker,
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
import { isauth } from "./isauth";
let colorPreference;
const SettingsPage = () => {
  let username = isauth.value;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  let [col, setCol] = useState("#3875D2");
  const handleNotificationsToggle = async () => {
    // Toggle the state
    setNotificationsEnabled(!notificationsEnabled);

    if (notificationsEnabled == false) {
      await LocalNotifications.cancel({ notifications: [] }); // Provide an empty array
    } else {
      scheduleDailyNotification();
    }
  };
  async function scheduleDailyNotification() {
    console.log("getting permissionl");
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display) {
      // Calculate the time for 12 pm.
      const now = new Date();
      const twelveNoon = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        14, // 12 pm
        0, // 0 minutes
        0 // 0 seconds
      );

      // Create the notification data.
      const notification = {
        title: "Roads",
        body: "Its time for you to memorize bible verses! ",
        id: 1, // You can use a different ID if needed.
        schedule: {
          at: twelveNoon,
          repeats: true, // This will repeat daily.
        },
      };

      // Schedule the notification.
      await LocalNotifications.schedule({ notifications: [notification] });

      console.log("Daily notification scheduled at 12 pm!");
    } else {
      console.log("Notifications are disabled. No notification scheduled.");
    }
  }
  async function settings(key, value) {
    let data = {
      username: username,
    };
    data[key] = value;

    let dato = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("https://www.roadsbible.com/api/settings/", dato)
      .then((response) => {
        console.log("Api REsponse:", response);
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // useEffect to save settings to localStorage whenever they change
  console.log(col);
  // Function to update settings
  function isNative() {
    return Capacitor.isNativePlatform();
  }
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
          <h3 className="ion-padding">General</h3>

          <IonList inset={true}>
            <IonItem color="light">
              <IonSelect
                disabled={true}
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
            <IonItem color="light" id="open-picker" button>
              <IonLabel>Translation</IonLabel>
              <IonPicker
                trigger="open-picker"
                columns={[
                  {
                    name: "languages",
                    options: [
                      {
                        text: "NLT",
                        value: "NLT",
                      },
                      {
                        text: "KJV",
                        value: "KJV",
                      },
                      {
                        text: "YLT",
                        value: "YLT",
                      },
                      {
                        text: "NIV (default)",
                        value: "NIV",
                      },
                      {
                        text: "ESV",
                        value: "ESV",
                      },
                      {
                        text: "ASV",
                        value: "ASV",
                      },
                    ],
                  },
                ]}
                buttons={[
                  {
                    text: "Cancel",
                    role: "cancel",
                  },
                  {
                    text: "Confirm",
                    handler: (value) => {
                      settings("translation", value.languages.value);
                    },
                  },
                ]}
              ></IonPicker>
            </IonItem>
            <IonItem color="light">
              Notifications
              <IonToggle
                slot="end"
                checked={!notificationsEnabled} // Controlled by state
                onIonChange={handleNotificationsToggle}
              ></IonToggle>
            </IonItem>
          </IonList>
          <h3 className="ion-padding">Appearance</h3>
          <IonList inset>
            <IonItem color="light">
              <IonRadioGroup
                value={colorPreference}
                onIonChange={(a) => {
                  settings("color", a.detail.value);
                  location.reload();
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
            <IonItem color="light">
              Custom Color {"  "}
              <input
                value={col} // Use the 'col' variable here
                onChange={(e) => {
                  setCol(e.target.value);
                }}
                onBlur={(e) => {
                  settings("color", col);
                }}
                type="color"
              />
            </IonItem>
            {isNative() ? (
              <IonItem color="light" routerLink="/tabs/settings/appicon/">
                App Icon
              </IonItem>
            ) : null}
          </IonList>
          <h3 className="ion-padding">App</h3>
          <IonList inset>
            <IonItem color="light" routerLink="/tabs/settings/install">
              Install Roads{" "}
              {!PWA && !isNative() ? (
                <IonBadge slot="end" color="danger">
                  1
                </IonBadge>
              ) : (
                <div></div>
              )}
            </IonItem>
          </IonList>
          <h3 className="ion-padding">Account Settings</h3>
          <IonList inset>
            <IonItem color="light" routerLink="/tabs/settings/account">
              View Account Settings
            </IonItem>
          </IonList>
          <h3 className="ion-padding">Links</h3>

          <IonList inset>
            <IonItem
              color="light"
              href="https://github.com/jadonus/roads_bible_vercel"
            >
              <IonIcon icon={logoGithub} /> Backend Source Code
            </IonItem>
            <IonItem
              color="light"
              href="https://github.com/jadonus/roads_frontend"
            >
              <IonIcon icon={logoGithub} /> Frontend Source Code
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default SettingsPage;
