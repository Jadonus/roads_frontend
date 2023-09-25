import {
    IonItem,
    IonIcon,
    IonBadge,
    IonApp,
    IonContent,
} from '@ionic/react'
import {
    settingsOutline
} from 'ionicons/icons'
function SettingsIcon() {
    
return (
<div>
    <h1>
        <IonItem href="/settings" direction="forward">
            <IonIcon icon={settingsOutline}></IonIcon>
            <IonBadge color="danger" >1</IonBadge>
</IonItem></h1>

</div>
)

}
export default SettingsIcon;