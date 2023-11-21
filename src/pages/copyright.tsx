import {
  IonPage,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonButtons,
} from "@ionic/react";
export default function Copyright({ onClose }) {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => onClose()}>Done</IonButton>
            {/* Clicking this button will close the modal */}
          </IonButtons>
          <IonTitle>Copyright info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <h3>NLT: </h3>
          Scripture quotations marked (NLT) are taken from the Holy Bible, New
          Living Translation, copyright ©1996, 2004, 2015 by Tyndale House
          Foundation. Used by permission of Tyndale House Publishers, Carol
          Stream, Illinois 60188. All rights reserved.
        </IonItem>
        <IonItem>
          <h3>NIV: </h3>
          Scripture quotations marked (NIV) are taken from the Holy Bible, New
          International Version®, NIV®. Copyright © 1973, 1978, 1984, 2011 by
          Biblica, Inc.™ Used by permission of Zondervan. All rights reserved
          worldwide. www.zondervan.comThe “NIV” and “New International Version”
          are trademarks registered in the United States Patent and Trademark
          Office by Biblica, Inc.™
        </IonItem>
        <IonItem>
          <h3>ESV: </h3>
          Scripture quotations are from The ESV® Bible (The Holy Bible, English
          Standard Version®), © 2001 by Crossway, a publishing ministry of Good
          News Publishers. Used by permission. All rights reserved.
        </IonItem>
        <IonItem>
          <h3>NASB: </h3>
          Scripture quotations taken from the (NASB®) New American Standard
          Bible®, Copyright © 1960, 1971, 1977, 1995, 2020 by The Lockman
          Foundation. Used by permission. All rights reserved. lockman.org
        </IonItem>
        <IonItem>
          <h3>AMP: </h3>
          Scripture quotations taken from the Amplified® Bible (AMP), Copyright
          © 2015 by The Lockman Foundation. Used by permission. lockman.org
        </IonItem>
      </IonContent>
    </>
  );
}
