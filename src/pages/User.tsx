import {
  IonCard,
  IonCardTitle,
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonChip,
  IonIcon,
  IonButton,
  IonFabButton,
  IonFab,
  IonSpinner,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
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
  }[];
}
export default function user() {
  let filteredMetadata = []; // Declare filteredMetadata here

  const [verse, setVerse] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [dynamicPath, setDynamicPath] = useState<string>(""); // State variable to hold the dynamic path

  const { user } = useAuth0();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const openModalWithDynamicPath = (dynamicPath: string) => {
    setShowModal(true);
    setDynamicPath(dynamicPath); // Store the dynamic path in a state variable
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
        console.log("response: " + response);
        const fetchedData = await response.json();
        console.log(fetchedData);
        setDashboardData(fetchedData);
        console.log(dashboardData);
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
      console.log(dashboardData);
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

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  const closeModal = () => {
    setShowModal(false); // This function closes the modal
  };
  return (
    <>
      <IonButton expand="block" style={{ margin: "1rem" }}>
        <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
      </IonButton>
      {dashboardData.combined_data.map((item: any, index: number) => {
        // Apply your filtering logic here
        return (
          <IonCard
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
        return null; // If the item doesn't meet the filtering criteria
      })}
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={addCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
      {showModal && (
        <Verse dynamicPath={dynamicPath} userr={true} onClose={closeModal} />
      )}
    </>
  );
}
