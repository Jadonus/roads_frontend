import {
  IonCard,
  IonCardTitle,
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonChip,
  IonActionSheet,
  IonAlert,
  IonIcon,
  IonButton,
  IonFabButton,
  IonFab,
  IonSpinner,
  IonLabel,
} from "@ionic/react";
import React, { useState, useRef, useEffect } from "react";
import {
  IonSearchbarCustomEvent,
  RefresherEventDetail,
  SearchbarChangeEventDetail,
} from "@ionic/core";
import { useAuth0 } from "@auth0/auth0-react";
import "./ExploreContainer.css";
import Verse from "./Verse";

interface ContainerProps {}

import { addCircle } from "ionicons/icons";

interface DashboardData {
  combined_data: {
    title: string;
    num: number;
    url: string[];
    descriptions: string[];
    creator: string; // Added creator property here
  }[];
}

export default function user() {
  let filteredMetadata = [];

  const [verse, setVerse] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);

  const startLongPress = (item) => {
    setLongPressTimer(
      setTimeout(() => {
        openActionSheet(item);
      }, 500) // Adjust the delay (in milliseconds) as needed
    );
  };

  const endLongPress = () => {
    clearTimeout(longPressTimer);
  };

  const openActionSheet = (item) => {
    setSelectedCard(item);
    setShowActionSheet(true);
  };

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [dynamicPath, setDynamicPath] = useState<string>("");

  const { user } = useAuth0();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const openModalWithDynamicPath = (dynamicPath: string) => {
    setShowModal(true);
    setDynamicPath(dynamicPath);
  };

  useEffect(() => {
    const data = {
      username: user.name,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const fetchDashboardData = async () => {
      try {
        const dashboardUrl = "https://www.roadsbible.com/userdash/";
        const response = await fetch(dashboardUrl, options);

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

  useEffect(() => {
    if (dashboardData) {
      filteredMetadata = dashboardData.combined_data.filter((item: any) => {
        const firstItem = item.combined_data;
        return (
          firstItem &&
          firstItem.description &&
          firstItem.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
    }
  }, [dashboardData, searchQuery]);

  if (dashboardData === null) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <IonSpinner
          style={{ margin: "auto", width: "7rem", height: "7rem" }}
          name="dots"
        ></IonSpinner>
      </div>
    );
  }
  if (dashboardData.combined_data.length === 0) {
    return (
      <div>
        <IonItem>
          <IonLabel>You do not have any custom roads yet. </IonLabel>
        </IonItem>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/tabs/dashboard/makeroad/">
            <IonIcon icon={addCircle}></IonIcon>
          </IonFabButton>
        </IonFab>
      </div>
    );
  }

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {dashboardData.combined_data.map((item: any, index: number) => {
        return (
          <IonCard
            onTouchStart={() => startLongPress(item)}
            onTouchEnd={endLongPress}
            onTouchCancel={endLongPress}
            onClick={() => openModalWithDynamicPath(item.url[0])}
            className="margin"
            key={index}
          >
            <IonCardHeader>
              <IonCardTitle>{item.title || "No title available"}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{item.descriptions[0] || "No description available"}</p>
              <IonChip>{item.num} Verses</IonChip>
              <p>Made By {item.creator}</p>
            </IonCardContent>
            <IonButton fill="clear"></IonButton>
          </IonCard>
        );
      })}
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton routerLink="/tabs/dashboard/makeroad/">
          <IonIcon icon={addCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
      {showModal && (
        <Verse dynamicPath={dynamicPath} userr={true} onClose={closeModal} />
      )}
      {showActionSheet && selectedCard && (
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Share",
              handler: () => {
                if (navigator.share) {
                  const shareData = {
                    title: "Roads",
                    text: "Check out this Road!",
                    url: `https://dashboard.roadsbible.com/tabs/dashboard/${selectedCard.creator}/${selectedCard.title}`,
                  };

                  navigator.share(shareData);
                }
              },
            },
            {
              text: "Delete",
              role: "destructive",
              handler: () => {
                const data = {
                  username: user.name,
                  road: selectedCard.title,
                };

                const options = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                };

                fetch("https://www.roadsbible.com/api/delete/", options).then(
                  () => {
                    location.reload();
                  }
                );
                // Handle the delete action using 'selectedCard'
              },
            },
            {
              text: "Cancel",
              role: "cancel",
            },
          ]}
        />
      )}
    </>
  );
}
