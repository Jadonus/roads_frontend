import {
  IonCard,
  IonCardTitle,
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonChip,
  IonActionSheet,
  IonModal,
  IonAlert,
  IonIcon,
  IonFabList,
  IonButton,
  IonFabButton,
  IonFab,
  IonSpinner,
  IonLabel,
  IonNote,
  IonToast,
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
import {
  addCircle,
  createOutline,
  linkOutline,
  micCircle,
  person,
  personCircle,
} from "ionicons/icons";
interface ContainerProps {}

interface DashboardData {
  combined_data: {
    title: string;
    num: number;
    url: string[];
    descriptions: string[];
    creator: string; // Added creator property here
  }[];
}
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { isauth } from "./isauth";
export default function user() {
  let filteredMetadata = [];
  const [link, setlink] = useState(false);
  const [verse, setVerse] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };
  //HELLO
  const startLongPress = (item) => {
    setLongPressTimer(
      setTimeout(() => {
        hapticsImpactMedium();
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

  let username = isauth.value;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const openModalWithDynamicPath = (dynamicPath: string) => {
    setShowModal(true);
    setDynamicPath(dynamicPath);
  };

  useEffect(() => {
    const data = {
      username: username,
      date: Date.now().toString(),
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
        if (fetchedData.error) {
          console.log("fatal error");
          setlink(true);
        } else {
          setDashboardData(fetchedData);
        }
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
          style={{ margin: "auto", width: "3rem", height: "3rem" }}
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
      </div>
    );
  }
  if (link) {
    return (
      <>
        <IonCard color="danger">
          <IonCardContent>Error loading custom roads.</IonCardContent>
        </IonCard>
      </>
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
              {item.num} Verses {"      "}
              <IonIcon
                icon={personCircle}
                color="primary"
                size="medium"
              ></IonIcon>
            </IonCardContent>
            <IonButton fill="clear"></IonButton>
          </IonCard>
        );
      })}
      <IonModal isOpen={showModal}>
        <Verse
          index={undefined}
          dynamicPath={dynamicPath}
          userr={true}
          onClose={closeModal}
        />
      </IonModal>{" "}
      {showActionSheet && selectedCard && (
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Share",
              icon: "share",

              handler: () => {
                const shareData = {
                  title: "Roads",
                  text: `${selectedCard.creator}_${encodeURIComponent(
                    selectedCard.title
                  )}`,
                  url: "https://dashboard.roadsbible.com/tabs/dashboard/roadlink/",
                };
                if (navigator.share) {
                  navigator.share(shareData);
                }
              },
            },
            {
              text: "Add Road For All",
              icon: "people",
              handler: () => {
                const data = {
                  username: username,
                  title: selectedCard.title,
                };

                const options = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                };
                fetch("https://www.roadsbible.com/api/approve/", options);
                setIsOpen(true);
              },
            },
            {
              text: "Delete",
              icon: "trash",
              role: "destructive",
              handler: () => {
                const data = {
                  username: username,
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
              icon: "close",
              text: "Cancel",
              role: "cancel",
            },
          ]}
        />
      )}
      <IonToast
        isOpen={isOpen}
        message="Your Road is currently awaiting approval to be added."
        onDidDismiss={() => setIsOpen(false)}
        duration={4000}
        color="primary"
      ></IonToast>
    </>
  );
}
