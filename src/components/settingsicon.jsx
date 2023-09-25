import {
    IonRouterLink,
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
<IonApp>
    <IonContent>
<div>
    <h1>
        <IonRouterLink href="/settings" direction="forward">
            <IonIcon icon={settingsOutline}></IonIcon>
            <IonBadge color="danger" >1</IonBadge>
</IonRouterLink></h1>

</div>
</IonContent>

</IonApp>
)

}
export default SettingsIcon;