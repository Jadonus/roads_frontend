import { IonIcon } from "@ionic/react";
import { square } from "ionicons/icons";
import {Mousewheel} from "swiper/modules" 

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
        <Swiper
        modules={[Mousewheel]}
        mousewheel={true}
        >
          <SwiperSlide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <IonCard>
                <img alt="Welcome Image" src="/welcome.png" width="1000" />
                <IonCardHeader>
                  <IonCardTitle>Roads</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  This will be a quick guide on how to use the Roads app. Swipe
                  to continue.
                </IonCardContent>
              </IonCard>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <IonCard>
                <img
                  alt="Silhouette of mountains"
                  src="https://ionicframework.com/docs/img/demos/card-media.png"
                />
                <IonCardHeader>
                  <IonCardTitle>Roads Is Easy to Use</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Once You Get to the dashboard, you can get started. Start by
                  scrolling to find a road to memorize, and then click the
                  button.
                </IonCardContent>
              </IonCard>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <img
                src="/2.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Maintain // Maintain aspect ratio
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <img
                src="/3.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Maintain // Maintain aspect ratio

                }}
              />
            </div>
          </SwiperSlide>
    <SwiperSlide>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
    <IonCard>
                <img
                  alt="Silhouette of mountains"
                  src="https://ionicframework.com/docs/img/demos/card-media.png"
                />
                <IonCardHeader>
                  <IonCardTitle>This Is Roads</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
               This has been a short tutorial on how to use Roads. Swipe once more to go to the dashboard.
                </IonCardContent>
              </IonCard>
              </div>
              </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};
export default welcome;
