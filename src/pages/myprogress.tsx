
import { IonToolbar, IonPage, IonTitle, IonContent, IonHeader} from "@ionic/react";

function Myprogress() {

    return (
<IonPage>
<IonContent>
<IonHeader>
    <IonToolbar>
<IonTitle size="large">My Progress</IonTitle>
    </IonToolbar>
</IonHeader>
<div style={{margin: '1rem',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
<img src="/road-svgrepo-com.svg" />
</div>
</IonContent>
</IonPage>

    )

}
export default Myprogress