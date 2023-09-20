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
import Settings from "./pages/Settings";
import Verseday from "./pages/verseday";
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

/* Theme variables */
import "./theme/variables.css";
setupIonicReact();

const App: React.FC = () => {

  const [primaryAccentColor, setPrimaryAccentColor] = useState(() => {
    const storedPrimaryAccentColor = localStorage.getItem("colorPreference");
    return storedPrimaryAccentColor || "#3875D2"; // Default to blue (or your desired default color)
  });

  useEffect(() => {
    // Set the CSS variable for primary accent color
    root.style.setProperty("--ion-color-primary", primaryAccentColor);
console.log(primaryAccentColor);
    // Store the preference in local storage
  }) 

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact component={ExploreContainer} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/roads/:groupName" component={Verse} exact />
        <Route path="/verseoftheday" component={Verseday} exact />
        </IonRouterOutlet>

      </IonReactRouter>
    </IonApp>
  );
}

export default App;

