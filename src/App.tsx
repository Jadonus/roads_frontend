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
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
/* Theme variables */
import "./theme/variables.css";
import Myprogress from "./pages/myprogress";
import Makeroad from "./pages/makeroad";
setupIonicReact();
type MyAuth0ProviderOptions = {
  domain: string;
  clientId: string;
  redirectUri: string;
};
let received;
const App: React.FC = () => {
  const { user, isAuthenticated } = useAuth0(); // Get user and isAuthenticated status

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (user) {
      // Run your code here when the user is authenticated
      console.log("Authentication");
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      console.log("useffect");

      console.log("useffected");
      // Check if the user is authenticated
      const data = {
        username: user.name, // Access user information
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
  }, [user]);
  const currentPath = window.location.pathname;

  // Define a function to determine if a tab should be active
  const isTabActive = (tabPath: string) => {
    return currentPath === tabPath;
  };
  const Dashboard = withAuthenticationRequired(ExploreContainer);
  const Roads = withAuthenticationRequired(Verse);
  const Make = withAuthenticationRequired(Makeroad);
  const Aipp = withAuthenticationRequired(TabBar);
  return (
    <Auth0Provider
      domain="dev-72prekgw4c7whtas.us.auth0.com"
      clientId="Ul7yQWjotlDqR1fscE5m5pHEZ6VBvGsv"
      redirectUri="https://dashboard.roadsbible.com/tabs/"
      {...({} as MyAuth0ProviderOptions)}
    >
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Dashboard Routes */}
            <Redirect from="/" to="/tabs" />
            <Route path="/tabs" render={() => <Aipp />} />
            <Route path="/dev" render={() => <TabBar />} />
            <Route path="/" exact render={() => <Login />} />
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

      <AuthenticationAction />
    </Auth0Provider>
  );
};

export default App;
