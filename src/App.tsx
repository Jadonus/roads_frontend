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
import Signup from "./pages/signup";
import { isauth } from "./pages/isauth";
import welcome from "./pages/welcome";
setupIonicReact();

let received;
const App: React.FC = () => {
  //const [isauth, setIsAuth] = useState(false)
  /* function get() {
    if (isauth) {
      console.log("useffect");
      console.log("valu", isauth.value);
      console.log("useffected");
      // Check if the user is authenticated
      const data = {
        username: isauth.value, // Access user information
      };
      console.log("data", data);
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
          console.error("There was a problem with the fetch operation:", error);
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
  } */
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Dashboard Routes */}
          <Switch>
            <Route path="/signup" component={Signup} exact />
            <Route path="/tabs" component={TabBar} />
            <Route path="/makedevv" exact component={Makeroad} />
            <Route path="/dev/dashboard" exact component={ExploreContainer} />
            <Route path="/devpro" exact component={Myprogress} />
            <Route path="/verseoftheday" component={Verseday} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/welcome/" component={welcome} exact />
            {/*} {isauth.value ? (
              <>
                <AuthenticationAction />
                <Redirect to="/tabs/dashboard/" />
              </>
            ) : (
              <Redirect to="/login" />
            )} */}
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
