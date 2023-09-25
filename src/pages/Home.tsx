import React, { useState, useEffect } from "react";
import {
  IonToolbar,
  IonTitle,
  IonHeader,
  IonCard,
  IonCardTitle,
  IonRouterLink,
  IonSpinner,
  IonCardContent,
  IonContent,
  IonItem,
  IonPage,
  IonSearchbar,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { settings, settingsOutline } from "ionicons/icons";
import {
  IonSearchbarCustomEvent,
  SearchbarChangeEventDetail,
} from "@ionic/core";
import { useAuth0 } from "@auth0/auth0-react";
import SettingsIcon from "../components/settingsicon";
import "./ExploreContainer.css";
import { Link } from "react-router-dom";
interface ContainerProps {}
interface DashboardData {
  combined_data: any[]; // Adjust the type accordingly if 'combined_data' has a specific structure.
}
const ExploreContainer: React.FC<ContainerProps> = () => {
  const [verse, setVerse] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const { user } = useAuth0();

  let PWA = window.matchMedia("(display-mode: standalone)").matches;
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    const verseUrl = "https://beta.ourmanna.com/api/v1/get";
console.log(verseUrl);
    fetch(verseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((fetchedData) => {
        setVerse(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching verse:", error);
      });
  }, []);

  useEffect(() => {
    const dashboardUrl = "https://www.roadsbible.com/dashboard";

    fetch(dashboardUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((fetchedData) => {
        setDashboardData(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Create a new function that adapts the event type
  const handleIonSearchChange = (
    e: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => {
    // You can access e.detail.value for the search query
    setSearchQuery(e.detail.value || "");
  };

  console.log(dashboardData);
  const filteredMetadata = Array.isArray(dashboardData?.combined_data)
    ? dashboardData.combined_data.filter((item: any) => {
        const firstItem = item.parsed_data[0];
        return (
          firstItem &&
          firstItem.description &&
          firstItem.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      })
    : [];

  if (verse === null || dashboardData === null) {
    return (
      <>
        <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <IonSpinner
            style={{ margin: "auto", width: "7rem", height: "7rem" }}
            name="dots"
          ></IonSpinner>
        </div>
      </>
    );
  }

  return (
    <>
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonTitle size="large" >
                Dashboard
              </IonTitle>

              <IonButtons style={{ paddingTop: "1.2rem" }} slot="end">
                <div>
                  <h1>
                    <IonRouterLink
                      routerLink="/settings"
                      target="_blank"
                      routerDirection="forward"
                      style={{ paddingRight: "1rem" }}
                    >
                      <IonIcon icon={settingsOutline}></IonIcon>
                      {!PWA ? (
                        <IonBadge
                          color="danger"
                          style={{
                            position: "absolute",
                            left: "1rem",
                            top: "1rem",
marginTop: "0.5rem" 
                          }}
                        >
                          1
                        </IonBadge>
                      ) : (
                        <div style={{marginTop: '1.2rem'}}></div>
                      )}
                    </IonRouterLink>
                  </h1>
                </div>
              </IonButtons>
            </IonToolbar>
            <IonToolbar className="">
              <IonSearchbar
                className="mt"
                placeholder="Search all roads"
                onIonChange={handleIonSearchChange}
                value={searchQuery}
              />
            </IonToolbar>
          </IonHeader>
          <IonItem>
            <IonCardTitle>Verse Of the Day</IonCardTitle>
          </IonItem>
          <IonItem lines="none" href="/verseoftheday">
            <IonLabel className="ion-text-wrap">{verse}</IonLabel>
          </IonItem>

          <div>
            {filteredMetadata.map((item: any, index: number) => (
              <IonCard className="margin" key={index}>
                <IonCardContent>
                  <IonCardTitle>
                    {item.parsed_data[0]?.title || "No title available"}
                  </IonCardTitle>
                  <p>
                    {" "}
                    {item.parsed_data[0]?.description ||
                      "No description available"}
                  </p>
                  <IonRouterLink
                    routerLink={item.parsed_data[0]?.url || ""}
                    target="_blank"
                    routerDirection="forward"
                  >
                    Memorize!
                  </IonRouterLink>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ExploreContainer;
