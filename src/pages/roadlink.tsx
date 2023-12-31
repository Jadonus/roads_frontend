import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonPage,
  IonInput,
  IonContent,
  IonList,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { isauth } from "./isauth";

function Roadlink() {
  const [description, setDescription] = useState();
  // A simple utility function to get the username from wherever you store it
  let username = isauth.value;
  const [userr, setUserr] = useState<string | undefined>(undefined); // Initialize state variables with the correct type
  const [road, setRoad] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  useEffect(() => {
    const decodedInput = decodeURI(id);
    const [userr, road] = decodedInput.split("_"); // Declare them inside the useEffect
    console.log(userr, road);
    setUserr(userr); // Set the state variables with the values
    setRoad(road);
  }, [id]);

  console.log(userr, road);
  const [success, setSuccess] = useState(false);
  let verses;
  const [title, setTitle] = useState();
  async function get() {
    const dat = {
      username: username,
      usertoget: userr,
      road: road,
    };
    const requestOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dat),
    };

    try {
      const response = await fetch(
        "https://www.roadsbible.com/api/getroad/",
        requestOption
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Make sure to await this!

      console.log(data);
      setTitle(data.data[0].fields.title);
      setDescription(data.data[0].fields.verses[0].description);
      verses = data.data[0].fields.verses;
      // Now your data should be defined.
    } catch (error) {
      console.error("Oops, something went wrong:", error);
    }
  }
  get();
  function neww() {
    const dat = {
      username: username,
      title: title,
      verses: verses,
    };
    const requestOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dat),
    };
    fetch("https://www.roadsbible.com/api/newroad/", requestOption)
      .then((data) => {
        setSuccess(true);
      })
      .catch();
  }
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons>
              <IonBackButton />
            </IonButtons>
            <IonTitle size="large">Get A Road.</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <>
            <IonList inset>
              <IonItem>
                <IonInput
                  label="Road ID"
                  placeholder="Put The Id here."
                  value={id || ""} // Ensure the input value is a string or an empty string
                  onIonInput={(e) => {
                    setId(e.target.value.toString()); // Convert the input value to a string
                  }}
                />
              </IonItem>
            </IonList>
          </>
          {title !== null && title !== undefined ? (
            <>
              <IonItem>
                {" "}
                <h1>{title}</h1>
              </IonItem>{" "}
              <IonItem>
                <p>
                  {description} | Made by {userr}
                </p>
              </IonItem>
              <IonItem>
                <IonButton onClick={neww} size="small" shape="round">
                  GET
                </IonButton>
              </IonItem>
            </>
          ) : id === null && id === undefined ? (
            <>
              <IonItem>
                <p>Waiting For Input...</p>
              </IonItem>
            </>
          ) : (
            <IonItem>
              <h1>This Road Does not Exist or the ID is wrong.</h1>
            </IonItem>
          )}

          {success ? (
            <IonItem routerLink="/tabs/dashboard/">
              🎉 Your Road Has been added
            </IonItem>
          ) : null}
        </IonContent>
      </IonPage>
    </>
  );
}
export default Roadlink;
