import React, { useState, useEffect } from "react";
import {
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonItemSliding,
  IonHeader,
  IonCard,
  IonCardTitle,
  IonRouterLink,
  IonSpinner,
  IonCardContent,
  IonContent,
  IonCardHeader,
  IonItem,
  IonPage,
  IonAvatar,
  IonSearchbar,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonChip,
  IonRefresher,
  IonItemOption,
  IonItemOptions,
  IonRefresherContent,
  IonBadge,
} from "@ionic/react";
import "../theme/variables.css";
import { settingsOutline, share } from "ionicons/icons";
import {
  IonSearchbarCustomEvent,
  RefresherEventDetail,
  SearchbarChangeEventDetail,
} from "@ionic/core";
import { useAuth0 } from "@auth0/auth0-react";
import "./ExploreContainer.css";
import Verse from "./Verse";

interface ContainerProps {}

interface DashboardData {
  combined_data: any[]; // Adjust the type accordingly if 'combined_data' has a specific structure.
}
import User from "./User"; // Import the User component

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [verse, setVerse] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [dynamicPath, setDynamicPath] = useState<string>(""); // State variable to hold the dynamic path
  const [activeSegment, setActiveSegment] = useState<string>("default");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const openModalWithDynamicPath = (dynamicPath: string) => {
    setShowModal(true);
    setDynamicPath(dynamicPath); // Store the dynamic path in a state variable
  };
  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const verseUrl = "https://beta.ourmanna.com/api/v1/get";
        const response = await fetch(verseUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const fetchedData = await response.text();
        setVerse(fetchedData);
      } catch (error) {
        console.error("Error fetching verse:", error);
      }
    };

    fetchVerse();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardUrl = "https://www.roadsbible.com/dashboard";
        const response = await fetch(dashboardUrl);

        if (!response.ok) {
          throw Error("Network response was not ok");
        }

        const fetchedData = await response.json();
        setDashboardData(fetchedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleIonSearchChange = (
    e: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => {
    setSearchQuery(e.detail.value || "");
  };

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
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <IonSpinner
          style={{ margin: "auto", width: "7rem", height: "7rem" }}
          name="dots"
        ></IonSpinner>
      </div>
    );
  }

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      location.reload();
      event.detail.complete();
    }, 2000);
  }

  const closeModal = () => {
    setShowModal(false); // This function closes the modal
  };

  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader>
          <IonToolbar>
            <IonTitle style={{ marginTop: "1rem" }} size="large">
              Dashboard
            </IonTitle>
            <IonButtons style={{ paddingTop: "0.5rem" }} slot="end">
              <div>
                <h1>
                  <IonRouterLink
                    routerLink="/tabs/settings/"
                    target="_blank"
                    routerDirection="forward"
                    style={{ paddingRight: "1rem" }}
                  ></IonRouterLink>
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
        <IonSegment
          swipeGesture={true}
          value={activeSegment}
          onIonChange={(e) => setActiveSegment(e.detail.value as string)} // Cast e.detail.value to string
        >
          <IonSegmentButton value="default">
            <IonLabel>Home</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="next">
            <IonLabel>My Roads</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {activeSegment === "default" ? (
          <div>
            <IonItem>
              <IonCardTitle>Verse Of the Day</IonCardTitle>
            </IonItem>
            <IonItem lines="none" href="/verseoftheday">
              <IonLabel className="ion-text-wrap">{verse}</IonLabel>
            </IonItem>
            <div>
              {filteredMetadata.map((item: any, index: number) => (
                <IonCard
                  onClick={() =>
                    openModalWithDynamicPath(item.parsed_data[0]?.url)
                  }
                  className="margin"
                  key={index}
                >
                  <IonCardHeader>
                    <IonCardTitle>
                      {item.parsed_data[0]?.title || "No title available"}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      {item.parsed_data[0]?.description ||
                        "No description available"}
                    </p>
                    <IonChip>{item.num_groups} Verses</IonChip>
                  </IonCardContent>
                  <IonButton fill="clear"></IonButton>
                </IonCard>
              ))}
            </div>
            {showModal && (
              <Verse
                dynamicPath={dynamicPath}
                userr={false}
                onClose={closeModal}
              />
            )}
          </div>
        ) : (
          <User />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExploreContainer;
