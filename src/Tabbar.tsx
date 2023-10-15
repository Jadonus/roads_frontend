import React from "react";
import {
  IonBadge,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import { library, personCircle, settingsOutline, book } from "ionicons/icons";
import ExploreContainer from "./pages/Home";
import Verse from "./pages/Verse";
import Settings from "./pages/settings";
import Welcome from "./pages/welcome";
import About from "./pages/aboutroads";
import Install from "./pages/install";
import Myprogress from "./pages/myprogress";
const TabBar: React.FC = () => {
  let PWA = window.matchMedia("(display-mode: standalone)").matches;
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/dashboard" />
        <Route
          path="/tabs/dashboard"
          component={ExploreContainer}
          exact={true}
        />
        <Route path="/tabs/welcome" component={Myprogress} exact={true} />
        <Route path="/tabs/settings" component={Settings} exact={true} />

        <Route path="/tabs/settings/install" component={Install} exact={true} />
        <Route path="/tabs/roads/:groupName" component={Verse} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/tabs/dashboard">
          <IonIcon icon={library} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="welcome" href="/tabs/welcome">
          <IonIcon icon={personCircle} />
          <IonLabel>My Progress</IonLabel>
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
