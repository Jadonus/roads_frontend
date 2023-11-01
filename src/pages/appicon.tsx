import {
  IonPage,
  IonContent,
  IonButton,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonList,
} from "@ionic/react";
import { AppIcon } from "@capacitor-community/app-icon";
function Appicon() {
  const changeIcon = async (iconName) => {
    await AppIcon.change({ name: iconName, suppressNotification: false });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle size="large">App Icon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonRadioGroup
            onIonChange={(e) => changeIcon(e.detail.value)}
            allowEmptySelection={false}
          >
            <IonItem>
              <img
                className="ion-padding"
                src="/roads.png"
                width="100"
                alt="default icon"
              />
              <IonRadio value="default">Default</IonRadio>
            </IonItem>
            <IonItem>
              <img
                className="ion-padding"
                src="/rounded.png"
                width="100"
                alt="neumorph icon"
              />
              <IonRadio value="neumorph">Neumorph</IonRadio>
            </IonItem>
            <IonItem>
              <img
                className="ion-padding"
                src="/dsf.png"
                width="100"
                alt="neumorph icon"
              />
              <IonRadio value="classic">Classic</IonRadio>
            </IonItem>
          </IonRadioGroup>{" "}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
export default Appicon;
