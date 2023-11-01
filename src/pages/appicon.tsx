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
  IonCheckbox,
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
          <IonTitle>App Icon</IonTitle>
        </IonToolbar>
        <IonButton onClick={() => changeIcon("neumorph")}>Change</IonButton>
      </IonHeader>
    </IonPage>
  );
}
export default Appicon;
