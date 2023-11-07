import React, { useState, useEffect } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonListHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { isauth } from "./isauth";
import Verse from "./Verse";
export default function Favorites() {
  const [stuff, setStuff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dynamicPath, setDynamicPath] = useState<string>("");
  useEffect(() => {
    getfavs();
  }, [isauth.value]);

  async function getfavs() {
    const data = {
      username: isauth.value,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "https://www.roadsbible.com/api/getfav/",
        requestOptions
      );
      if (response.status === 404) {
        setStuff([]);
      } else {
        const data = await response.json();
        setStuff(data);
        console.log("stuff", stuff);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  // State variable to hold the dynamic path

  const openModalWithDynamicPath = (dynamicPath: string) => {
    setShowModal(true);
    setDynamicPath(dynamicPath); // Store the dynamic path in a state variable
  };
  const closeModal = () => {
    setShowModal(false); // This function closes the modal
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonListHeader color="light">Verses</IonListHeader>
          {stuff.length === 0 ? (
            <IonLoading title="Loading" isOpen={true}></IonLoading>
          ) : (
            stuff.map((e, index) => (
              <IonItem
                color="light"
                key={index}
                // onClick={() => openModalWithDynamicPath(e.title)}
              >
                <h3>{e.verse}</h3>
                {showModal ? (
                  <Verse
                    dynamicPath={dynamicPath}
                    userr={true}
                    index={e.index}
                    onClose={closeModal}
                  />
                ) : null}
              </IonItem>
            ))
          )}
        </IonList>
        {stuff.length === 0 && (
          <IonItem>You do not have any favorites!</IonItem>
        )}
      </IonContent>
    </IonPage>
  );
}
