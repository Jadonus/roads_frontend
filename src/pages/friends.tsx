import {
  IonIcon,
  IonList,
  IonItem,
  IonButton,
  IonAlert,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { people, add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
type FriendsData = {
  friendsnames: string[];
  friendspracticedates: string[];
  friendspracticetitles: string[];
  friendsroads: any[]; // Assuming friendsroads is an array of objects
  name: string;
};
export default function Friends(username: any) {
  const [dataa, setDataa] = useState<FriendsData>({
    friendsnames: [],
    friendspracticedates: [],
    friendspracticetitles: [],
    friendsroads: [],
    name: "",
  });
  const [res, setRes] = useState(null);
  async function addFriend(
    username: string,
    requestedName: string,
    name: string
  ) {
    const data = {
      username: username,
      friendtoadd: requestedName,
      name: name,
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
        "https://www.roadsbible.com/api/newfriend/",
        requestOptions
      );
      const jsonData = await response.json();
      setRes(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchData(username: string) {
      const data = {
        username: username,
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
          "https://www.roadsbible.com/api/friends/",
          requestOptions
        );
        const jsonData = await response.json();
        setDataa(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(username.username);
  }, [username]); // Add username as a dependency here
  return (
    <>
      <div>
        {dataa.friendsnames.length === 0 ? (
          <>
            <h1 className="ion-text-center">
              <IonIcon size="large" icon={people} />
            </h1>
            <p className="ion-text-center">You have no friends.</p>
          </>
        ) : (
          dataa.friendsnames.map((friend, index) => (
            <div key={index}>
              <IonList inset>
                <IonItem color="light">
                  <IonGrid>
                    <IonCol>
                      <h3>Name: {friend}</h3>
                    </IonCol>
                    <IonCol>
                      <p>
                        Last time they practiced:
                        {new Date(
                          dataa.friendspracticedates[index]
                        ).toLocaleDateString()}
                      </p>
                    </IonCol>
                    <IonCol>
                      <p>Their Roads: {dataa.friendspracticetitles[index]}</p>
                    </IonCol>
                  </IonGrid>
                </IonItem>
              </IonList>
            </div>
          ))
        )}{" "}
      </div>
      <p className="ion-text-center">
        {" "}
        <IonButton id="present-alert" slot="center">
          <IonIcon icon={add}></IonIcon>New Friend
        </IonButton>
      </p>
      <IonAlert
        trigger="present-alert"
        header="Enter In Info to add friend"
        message="Make sure that the nickame you enter is the same if you have already chosen it. "
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              // Handle cancel action if needed
            },
          },
          {
            text: "Add Friend",
            handler: (e) => {
              // Call addFriend function with the input values
              addFriend(username.username, e.as, e.bs);
            },
          },
        ]}
        inputs={[
          {
            placeholder: "Nickname (max 8 characters)",
            name: "bs",
            attributes: {
              maxlength: 255,
            },
          },
          {
            placeholder: "Friends Nickname",
            name: "as",
            attributes: {
              maxlength: 255,
            },
          },
        ]}
      ></IonAlert>
    </>
  );
}
