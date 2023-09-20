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
  IonLabel
} from "@ionic/react";
import { IonSearchbarCustomEvent, SearchbarChangeEventDetail } from "@ionic/core";

import "./ExploreContainer.css";
import { Link } from "react-router-dom";
interface ContainerProps {}
interface DashboardData {
  combined_data: any[]; // Adjust the type accordingly if 'combined_data' has a specific structure.
}
const ExploreContainer: React.FC<ContainerProps> = () => {
  const [verse, setVerse] = useState<string | null>(null);
const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    const verseUrl = "https://beta.ourmanna.com/api/v1/get";

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
    const dashboardUrl = "https://roadsbible.com/dashboard";

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
const handleIonSearchChange = (e: IonSearchbarCustomEvent<SearchbarChangeEventDetail>) => {
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
      <IonSpinner
        style={{ margin: "auto", width: "5rem", height: "5rem" }}
        name="dots"
      ></IonSpinner>
    );
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
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
        <IonContent>
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
