import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { personCircle, book, library, settingsOutline } from "ionicons/icons";
import AuthenticationAction from "./get";
import { IonReactRouter } from "@ionic/react-router";
import ExploreContainer from "./pages/Home";
import Verse from "./pages/Verse";
import Settings from "./pages/settings";
import Verseday from "./pages/verseday";
import Install from "./pages/install";
import Welcome from "./pages/welcome";
import Login from "./pages/login";
import TabBar from "./Tabbar";
import "@ionic/react/css/core.css";
import { Switch } from "react-router-dom";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
/* Theme variables */
import "./theme/variables.css";
import Myprogress from "./pages/myprogress";
import Makeroad from "./pages/makeroad";
setupIonicReact();

let received;
const App: React.FC = () => {
  const isauth = localStorage.getItem("token");
  useEffect(() => {
    if (!isauth) {
      // Token is missing, redirect the user to the login page
      // Replace '/login' with the actual route for your login page
      window.location.href = "/login";
    }
  }, [isauth]);

  const getUsername = () => {
    // You'll want to fetch this from your authentication state or local storage
    // For example, if you're using local storage:
    return localStorage.getItem("username");
  };
  useEffect(() => {
    if (isauth) {
      console.log("useffect");

      console.log("useffected");
      // Check if the user is authenticated
      const data = {
        username: getUsername(), // Access user information
      };
      console.log("data", data);
      function get() {
        fetch("https://www.roadsbible.com/api/settings", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Data received:", data);
            received = data;
            // Handle the response data as needed
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
        // Set the CSS variable for primary accent color
        document.documentElement.style.setProperty(
          "--ion-color-primary",
          received.fields.color
        );
        document.body.style.setProperty(
          "--ion-color-primary",
          received[0].fields.color
        );
      }
    }
  }, [getUsername()]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Dashboard Routes */}
          <Redirect from="/" to="/tabs" />
          <Route path="/tabs" render={() => <TabBar />} />
          <Route path="/" exact render={() => <TabBar />} />
          {/* Additional Routes */}
          <Route path="/makedevv" exact component={Makeroad} />
          <Route
            path="/dev/dashboard"
            exact
            render={() => <ExploreContainer />}
          />
          <Route path="/devpro" exact component={Myprogress}></Route>
          <Route path="/verseoftheday" component={Verseday} exact />
          <Route path="/login" component={Login} exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
