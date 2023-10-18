import React, { useState } from "react";
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

function Makeroad() {
  // State to manage the form inputs
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    book: "",
    reference: "",
  });

  // Function to handle adding a verse
  const handleAddVerse = () => {
    // You can access formInputs to get the values and process them as needed
    console.log("Form Inputs:", formInputs);

    // Clear the form inputs
    setFormInputs({
      name: "",
      description: "",
      book: "",
      reference: "",
    });
  };

  return (
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
              value={formInputs.name}
              onIonChange={(e) =>
                setFormInputs({ ...formInputs, name: e.detail.value })
              }
              placeholder="Your Name Here..."
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={formInputs.description}
              onIonChange={(e) =>
                setFormInputs({ ...formInputs, description: e.detail.value })
              }
              placeholder="Description"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={formInputs.book}
              onIonChange={(e) =>
                setFormInputs({ ...formInputs, book: e.detail.value })
              }
              placeholder="Book of your verse"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="number"
              value={formInputs.reference}
              onIonChange={(e) =>
                setFormInputs({ ...formInputs, reference: e.detail.value })
              }
              placeholder="Reference (example: 23:1)"
            ></IonInput>
          </IonItem>
          <IonButton onClick={handleAddVerse} fill="clear">
            Add Verse
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Makeroad;
