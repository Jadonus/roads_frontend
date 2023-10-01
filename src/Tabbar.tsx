import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { library, personCircle, settingsOutline, book, } from 'ionicons/icons';
import ExploreContainer from './pages/Home';
import Verse from './pages/Verse';
import Settings from './pages/settings';
import Welcome from './pages/welcome';
export default function TabBar() {
    return (
    <IonTabs>

        <IonRouterOutlet>

      <Redirect exact path="/tabs" to="/tabs/dashboard" />

      <Route exact path="/tabs/dashboard">
        <ExploreContainer />
      </Route>
 <Route exact path="/tabs/welcome">
        <Welcome />
      </Route>
 <Route exact path="/tabs/settings">
        <Settings />
      </Route>
 <Route exact path="/tabs/roads/:groupName">
        <Verse />
      </Route>
<Route exact path="/tabs">
        <Redirect to="/tabs/dashboard" />
      </Route>
            </IonRouterOutlet>
<IonTabBar slot="bottom">
            <IonTabButton tab="Dashboard" href="/tabs/dashboard"  >
              <IonIcon icon={library} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
            <IonTabButton tab="My Progress" href="/tabs/welcome" >
              <IonIcon icon={personCircle} />
              <IonLabel>My Progress</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Settings" href="/tabs/settings">
              <IonIcon icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Roads" href="/tabs/roads/" >
              <IonIcon icon={book} />
              <IonLabel>Roads</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
    )
}
