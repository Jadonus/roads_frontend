import {
    IonRouterLink,
    IonIcon,
    IonBadge,
} from '@ionic/react'
import {
    settingsOutline
} from 'ionicons/icons'
function SettingsIcon() {
    
return (
<div>
    <h1>
        <IonRouterLink href="/settings" direction="forward">
            <IonIcon icon={settingsOutline}></IonIcon>
            <IonBadge color="danger" >1</IonBadge>
</IonRouterLink></h1>

</div>

)

}
export default SettingsIcon;