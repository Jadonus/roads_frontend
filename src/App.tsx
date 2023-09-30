import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { personCircle, book, library, settingsOutline } from "ionicons/icons";
import { useLocation } from "react-router-dom";

import { IonReactRouter } from "@ionic/react-router";
import ExploreContainer from "./pages/Home";
import Verse from "./pages/Verse";
import Settings from "./pages/settings";
import Verseday from "./pages/verseday";
import Install from "./pages/install";
import Welcome from "./pages/welcome";
import Login from "./pages/login";

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

import { withAuthenticationRequired } from "@auth0/auth0-react";

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
    return darkpref || false; // Default to blue (or your desired default color)
  });

  useEffect(() => {
    // Set the CSS variable for primary accent color
    document.documentElement.style.setProperty(
      "--ion-color-primary",
      primaryAccentColor
    );
    document.body.style.setProperty("--ion-color-primary", primaryAccentColor);

    if (dark) {
      document.body.classList.add("dark");
    }
  });
 const location = useLocation();

  // Define a function to determine if a tab should be active
  const isTabActive = (tabPath: string) => {
    return location.pathname === tabPath;
  };
  const Dashboard = withAuthenticationRequired(ExploreContainer);
  const Roads = withAuthenticationRequired(Verse);

  return (
    <Auth0Provider
      domain="dev-72prekgw4c7whtas.us.auth0.com"
      clientId="Ul7yQWjotlDqR1fscE5m5pHEZ6VBvGsv"
      redirectUri="https://dashboard.roadsbible.com/"
      {...({} as MyAuth0ProviderOptions)}
    >
        <IonApp>
        <IonTabs>
          <IonRouterOutlet>
            {/* Dashboard Routes */}
            <Route path="/" component={Dashboard} exact />
            <Route path="/my-progress" component={Welcome} exact />
            <Route path="/settings" component={Settings} exact />
            <Route path="/roads/:groupName" component={Verse} exact />

            {/* Additional Routes */}
            <Route path="/verseoftheday" component={Verseday} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/settings/install" component={Install} exact />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Dashboard" href="/" selected={isTabActive("/")} >
              <IonIcon icon={library} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
            <IonTabButton tab="My Progress" href="/my-progress" selected={isTabActive("/my-progress")}>
              <IonIcon icon={personCircle} />
              <IonLabel>My Progress</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Settings" href="/settings"selected={isTabActive("/settings")}>
              <IonIcon icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Roads" href="/roads" selected={isTabActive("/roads")}>
              <IonIcon icon={book} />
              <IonLabel>Roads</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonApp>
    </Auth0Provider>
  );
};

export default App;

