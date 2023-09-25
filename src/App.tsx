import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import ExploreContainer from "./pages/Home";
import Verse from "./pages/Verse";
import Settings from "./pages/settings";
import Verseday from "./pages/verseday";
import "@ionic/react/css/core.css";
import { Switch } from "react-router-dom";
import Install from "./pages/install";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { Auth0Provider } from '@auth0/auth0-react';

import { withAuthenticationRequired } from '@auth0/auth0-react';

import Login from "./pages/login"
/* Theme variables */
import "./theme/variables.css";
setupIonicReact();
type MyAuth0ProviderOptions = {
  domain: string;
  clientId: string;
  redirectUri: string;
};
const App: React.FC = () => {

  const [primaryAccentColor, setPrimaryAccentColor] = useState(() => {
    const storedPrimaryAccentColor = localStorage.getItem("colorPreference");
    return storedPrimaryAccentColor || "#3875D2"; // Default to blue (or your desired default color)
  });
  const [dark] = useState(() => {
    const darkpref = localStorage.getItem("dark");
   console.log(darkpref);
    return darkpref || false; // Default to blue (or your desired default color)
    
  });
  console.log(dark)
useEffect(() => {
  // Set the CSS variable for primary accent color
  document.documentElement.style.setProperty("--ion-color-primary", primaryAccentColor);
  document.body.style.setProperty("--ion-color-primary", primaryAccentColor);

  // Toggle dark mode based on the 'dark' state
  if (dark) {
    document.body.classList.add('dark');
    console.log('dark mode enabled');
  } else {
    document.body.classList.remove('dark');
    console.log('dark mode disabled');
  }

  // Store the preference in local storage
}, [dark, primaryAccentColor]);
const Dashboard = withAuthenticationRequired(ExploreContainer);
const Roads = withAuthenticationRequired(Verse);
  return (
<Auth0Provider
  domain="dev-72prekgw4c7whtas.us.auth0.com"
  clientId="Ul7yQWjotlDqR1fscE5m5pHEZ6VBvGsv"
  redirectUri="https://dashboard.roadsbible.com"
  {...({} as MyAuth0ProviderOptions)}

>
    <IonApp className={dark ? 'dark' : ''}>

      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact component={Dashboard} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/roads/:groupName" component={Roads} exact />
        <Route path="/verseoftheday" component={Verseday} exact />
<Route path = "/dev" component = {ExploreContainer} exact />
        <Route path="/login" component={Login} exact />

        <Route path="/settings/install" component={Install} exact />
        </IonRouterOutlet>

      </IonReactRouter>
    </IonApp>
</Auth0Provider>
  );
}

export default App;

