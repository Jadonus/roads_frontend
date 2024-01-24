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
import Account from "./pages/account";
import AuthenticatedAction from "./get";
import { Route, Redirect } from "react-router";
import {
  library,
  personCircle,
  settingsOutline,
  book,
  heart,
  cog,
  barChart,
} from "ionicons/icons";
import ExploreContainer from "./pages/Home";
import Verse from "./pages/Verse";
import Settings from "./pages/settings";
import Roadlink from "./pages/roadlink";
import About from "./pages/aboutroads";
import Install from "./pages/install";
import Myprogress from "./pages/myprogress";
import { useAuth0 } from "@auth0/auth0-react";
import { isauth } from "./pages/isauth";
import Makeroad from "./pages/makeroad";
import { effect } from "@preact/signals";
import Appicon from "./pages/appicon";
import { Capacitor } from "@capacitor/core";
import Favorites from "./pages/favorites";
import copyright from "./pages/copyright";
import PreVerse from "./pages/PreVerse";
const TabBar: React.FC = () => {
  const [progress, setProgress] = useState(false);
  // A simple utility function to get the username from wherever you store it

  //const [isauth, setIsAuth] = useState(false)
  let username = isauth.value;
  console.log("sdfv", isauth.value);
  let PWA = window.matchMedia("(display-mode: standalone)").matches;
  function fetchData(userneam) {
    const data = {
      username: userneam,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://www.roadsbible.com/api/gameify/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if (response.numverses % 10 || response.numverses === "Not started") {
          console.log("sad...");
        } else {
          setProgress(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  effect(() => {
    fetchData(isauth.value);
  });
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
        <Route
          path="/tabs/dashboard/copyright"
          exact
          component={copyright}
        ></Route>
        <Route
          exact
          component={PreVerse}
          path="/tabs/dashboard/roads/:dynamicPath"
        ></Route>
        <Route path="/tabs/favorites" component={Favorites} exact={true} />
        <Route path="/tabs/welcome" component={Myprogress} exact={true} />
        <Route path="/tabs/settings" component={Settings} exact={true} />
        <Route path="/tabs/settings/appicon" component={Appicon} exact />
        <Route path="/tabs/settings/account" component={Account} exact={true} />
        <Route path="/tabs/settings/install" component={Install} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/tabs/dashboard">
          {/*} {isauth.value !== "" ? (
            <AuthenticatedAction />
          ) : (
            <Redirect to="/login" />
          )} */}
          <IonIcon icon={library} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="welcome" href="/tabs/welcome">
          <IonIcon icon={barChart} />
          <IonLabel>Stats</IonLabel>

          {progress ? <IonBadge color="danger">1</IonBadge> : <div></div>}
        </IonTabButton>
        <IonTabButton tab="favorites" href="/tabs/favorites/">
          <IonIcon icon={heart} />
          <IonLabel>Favorites</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
          {!PWA && !Capacitor.isNativePlatform() ? (
            <IonBadge color="danger">1</IonBadge>
          ) : (
            <div></div>
          )}
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabBar;
