import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonInput,
  IonItem,
  IonButton,
  IonBackButton,
} from "@ionic/react";

export default function makeroad() {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonBackButton />
            <IonTitle size="large">Make A Road</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonInput
                label="The Name of your road."
                placeholder="Your Name Here..."
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Description"
                placeholder="Description"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label="Book of your verse"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type="number"
                label="Reference (example: 23:1)"
              ></IonInput>
            </IonItem>
            <IonButton fill="clear">Add Verse</IonButton>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
}
