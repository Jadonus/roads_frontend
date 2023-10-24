import React, { useEffect, useState } from "react";
import {
  IonBadge,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import AuthenticatedAction from "./get";
import { Route, Redirect } from "react-router";
import { library, personCircle, settingsOutline, book } from "ionicons/icons";
import ExploreContainer from "./pages/Home";
import Verse from "./pages/Verse";
import Settings from "./pages/settings";
import Roadlink from "./pages/roadlink";
import About from "./pages/aboutroads";
import Install from "./pages/install";
import Myprogress from "./pages/myprogress";
import { useAuth0 } from "@auth0/auth0-react";
import Makeroad from "./pages/makeroad";
const TabBar: React.FC = () => {
  const [progress, setProgress] = useState(false);
  // A simple utility function to get the username from wherever you store it
  const [isauth, setIsAuth] = useState(localStorage.getItem("token"));
  //const [isauth, setIsAuth] = useState(false)
  const getUsername = () => {
    return localStorage.getItem("username");
  };
  let username = getUsername();
  let PWA = window.matchMedia("(display-mode: standalone)").matches;
  function fetchData() {
    if (username) {
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
      fetch("https://www.roadsbible.com/api/gameify", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          if (response.numverses % 10) {
            console.log("sad...");
          } else {
            setProgress(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("User or user.name is undefined.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/dashboard" />
        <Route
          path="/tabs/dashboard"
          component={ExploreContainer}
          exact={true}
        />
        <Route
          path="/tabs/dashboard/roadlink/"
          component={Roadlink}
          exact={true}
        />

        <Route
          path="/tabs/dashboard/makeroad"
          exact
          component={Makeroad}
        ></Route>
        <Route path="/tabs/welcome" component={Myprogress} exact={true} />
        <Route path="/tabs/settings" component={Settings} exact={true} />

        <Route path="/tabs/settings/install" component={Install} exact={true} />
        <Route path="/tabs/roads/:groupName" component={Verse} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/tabs/dashboard">
          {isauth !== "" ? <AuthenticatedAction /> : <Redirect to="/login" />}
          <IonIcon icon={library} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="welcome" href="/tabs/welcome">
          <IonIcon icon={personCircle} />
          <IonLabel>My Progress</IonLabel>

          {progress ? <IonBadge color="danger">1</IonBadge> : <div></div>}
        </IonTabButton>
        <IonTabButton tab="settings" href="/tabs/settings">
          <IonIcon icon={settingsOutline} />
          <IonLabel>Settings</IonLabel>
          {!PWA ? <IonBadge color="danger">1</IonBadge> : <div></div>}
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabBar;
