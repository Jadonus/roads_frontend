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
    if (iconName !== "default") {
      await AppIcon.change({ name: iconName, suppressNotification: false });
    } else {
      await AppIcon.reset({ suppressNotification: false });
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
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
                src="/green.png"
                width="100"
                alt="green icon"
              />
              <IonRadio value="green">Green</IonRadio>
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
