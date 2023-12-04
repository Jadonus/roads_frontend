import { IonIcon, IonNote } from "@ionic/react";
import { square } from "ionicons/icons";
import { Mousewheel } from "swiper/modules";
import { CreateAnimation, Animation } from "@ionic/react";

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
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonBackButton,
  IonCard,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
const welcome = () => {
  // Initialize settings using localStorage or default values

  // Function to update settings
  return (
    <IonPage>
      <IonContent color="">
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ fontSize: "5em", fontWeight: "bold" }}>Welcome</h1>
          <p style={{ textAlign: "center", fontSize: "1.5em" }}>
            This is Roads, the modern bible memory app for everyone.
          </p>
          <div style={{ flexDirection: "row" }}>
            <IonButton style={{ margin: "1rem" }} routerLink="/signup">
              Sign Up{" "}
            </IonButton>
            <IonButton routerLink="/login">Login </IonButton>
          </div>
          <IonNote style={{ margin: "1rem", textAlign: "center" }}>
            We Have signups so your settings and custom roads can stay account
            synced.
          </IonNote>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default welcome;
