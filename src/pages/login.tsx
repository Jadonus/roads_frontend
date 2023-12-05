import { IonIcon } from "@ionic/react";
import "history";
import { square } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonHeader,
  IonToolbar,
  IonSpinner,
  IonTitle,
  IonNote,
  IonButton,
  IonInput,
} from "@ionic/react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
const Login = () => {
  let history = useHistory();
  const [usernamee, setUsernamee] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(undefined);
  const [username, setUsername] = useState("");
  const [load, setLoad] = useState(false);
  const [response, setResponse] = useState(null);
  const [password, setPassword] = useState("");
  async function get() {
    let da = await axios.get("https://www.roadsbible.com/dj-rest-auth/user/", {
      params: {
        format: "json",
      },
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        Authorization: `Token ${token}`,
      },
    });
    setUsernamee(da.data.username);
    console.log(da.data.username);
  }
  const handleLogin = async () => {
    setLoad(true);
    let usernam = await Preferences.get({ key: "username" }).then(() => {});

    try {
      const response = await axios.post(
        "https://www.roadsbible.com/dj-rest-auth/login/",
        {
          email: username,
          password: password,
        }
      );

      if (response.status === 200) {
        setToken(response.data.key);
        console.log(token);
        await Preferences.set({
          key: "token",
          value: response.data.key,
        });
        await get().then(() => {
          Preferences.set({
            key: "username",
            value: usernamee,
          }).then(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const myParam = urlParams.get("redirect");
            window.location.href = myParam || "/tabs/dashboard/";
          });
        });
      } else {
        if (response) {
          setError(response);
          setLoad(false);
        } else {
          setError("Login failed");

          setLoad(false);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setError(error.response.data.non_field_errors[0]);
      } else {
        setError("Login failed");
      }
    }
  };
  useEffect(() => {
    // Inside an async function to use 'await'
    const checkUsernameAndRedirect = async () => {
      let usernam = await Preferences.get({ key: "username" });
      console.log("user", usernam.value);
      if (usernam.value) {
        // Username exists, navigate to the dashboard
        window.location.href = "/tabs/dashboard/";
      }
    };

    checkUsernameAndRedirect();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem color="light">
            <IonInput
              type="text"
              placeholder="Email"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>
          <IonItem color="light">
            <IonInput
              type="password"
              placeholder="Password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          {error !== undefined ? (
            <IonItem color="danger">{error}</IonItem>
          ) : (
            <></>
          )}
        </IonList>
        <IonList inset>
          <IonButton expand="block" onClick={handleLogin}>
            Log In {load ? <IonSpinner></IonSpinner> : <></>}
          </IonButton>
        </IonList>
        <IonNote className="ion-padding">
          {" "}
          Dont have an account? <a href="/signup">Sign up</a>{" "}
        </IonNote>
      </IonContent>
    </IonPage>
  );
};

export default Login;
