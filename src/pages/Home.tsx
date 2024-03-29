import React, { useState, useRef, useEffect } from "react";
import {
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonItemSliding,
  IonHeader,
  IonCard,
  IonFab,
  IonFabButton,
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
  IonFabList,
  IonItemOptions,
  IonRefresherContent,
  IonBadge,
  IonModal,
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
import PreVerse from "./PreVerse";
import { addCircle, createOutline, linkOutline } from "ionicons/icons";
interface ContainerProps {}

interface DashboardData {
  combined_data: any[]; // Adjust the type accordingly if 'combined_data' has a specific structure.
}
import User from "./User"; // Import the User component
import Makeroad from "./makeroad";

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [verse, setVerse] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [dynamicPath, setDynamicPath] = useState<string>(""); // State variable to hold the dynamic path
  const [activeSegment, setActiveSegment] = useState(false);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const openModalWithDynamicPath = (dynamicPath: string) => {
    setShowModal(true);
    setDynamicPath(dynamicPath); // Store the dynamic path in a state variable
  };
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
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
    setPresentingElement(page.current);
  }, []);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardUrl = "https://www.roadsbible.com/dashboard/";
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
          style={{ margin: "auto", width: "3rem", height: "3rem" }}
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
  function dismiss() {
    modal.current?.dismiss();
  }
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
        {/*} <IonSegment
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
  {activeSegment === "default" ? ( */}
        <div>
          <IonItem lines="none">
            <IonCardTitle>Verse Of the Day</IonCardTitle>
          </IonItem>
          <IonItem lines="none">
            <IonLabel
              onClick={() => openModalWithDynamicPath("verseoftheday")}
              className="ion-text-wrap"
            >
              {verse}
            </IonLabel>
          </IonItem>
          <User />
          <div>
            {filteredMetadata.map((item: any, index: number) => (
              <IonCard
                routerLink={"/tabs/dashboard" + item.parsed_data[0]?.url}
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
                  {item.num_groups} Verses
                </IonCardContent>
                <IonButton fill="clear"></IonButton>
              </IonCard>
            ))}
          </div>
        </div>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={addCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton id="open-modal">
              <IonIcon icon={createOutline}></IonIcon>
            </IonFabButton>

            <IonFabButton routerLink="/tabs/dashboard/roadlink/">
              <IonIcon icon={linkOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

        <IonModal
          ref={modal}
          id="card"
          trigger="open-modal"
          presentingElement={presentingElement!}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton color="danger" onClick={dismiss}>
                  Exit
                </IonButton>
              </IonButtons>
              <IonTitle>Make A Road.</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Makeroad />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ExploreContainer;
