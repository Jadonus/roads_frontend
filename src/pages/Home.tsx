import React, { useState, useRef, useEffect } from "react";
import {
  IonToolbar,
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
  RefresherEventDetail,
  IonBadge,
} from "@ionic/react";
import "../theme/variables.css";
import { settings, settingsOutline, share } from "ionicons/icons";
import {
  IonSearchbarCustomEvent,
  SearchbarChangeEventDetail,
} from "@ionic/core";
import { useAuth0 } from "@auth0/auth0-react";
import SettingsIcon from "../components/settingsicon";
import "./ExploreContainer.css";
import Verse from "./Verse";
interface ContainerProps {}

const itemOptionRef = useRef(null);
interface DashboardData {
  combined_data: any[]; // Adjust the type accordingly if 'combined_data' has a specific structure.
}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [verse, setVerse] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [dynamicPath, setDynamicPath] = useState<string>(""); // State variable to hold the dynamic path
  const openModalWithDynamicPath = (dynamicPath: string) => {
    setShowModal(true);
    setDynamicPath(dynamicPath); // Store the dynamic path in a state variable
  };

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
          throw Error("Network response was not ok");
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

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }
  const closeModal = () => {
    setShowModal(false); // This function closes the modal
  };
  function share(title, url, description) {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
          text: description,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      console.log("Error");
      // fallback
    }
  }

  useEffect(() => {
    const itemOption = itemOptionRef.current;
    if (itemOption) {
      filteredMetadata.map((item: any, index: number) => {
        itemOption.addEventListener("ionSwipe", () => {
          share(
            item.parsed_data[0]?.title,
            "https://www.dashboard.roadsbible.com/tabs/dashboard",
            item.parsed_data[0]?.description
          );
        });
      });
    }
  }, []);

  return (
    <>
      <IonPage>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{ marginTop: "-3.2rem" }} size="large">
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
                    >
                      <IonAvatar>
                        {user ? (
                          <img
                            alt="Profile"
                            style={{
                              width: "2rem",
                              height: "2rem",
                              marginRight: ".7rem",
                            }}
                            src={user.picture}
                          />
                        ) : (
                          <IonIcon
                            className="color"
                            icon={settingsOutline}
                          ></IonIcon>
                        )}
                      </IonAvatar>
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
              <IonItemSliding>
                <IonItemOptions side="end" ref={itemOptionRef}>
                  <IonItemOption color="primary" expandable>
                    <IonIcon slot="icon-only" icon="share"></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
                <IonItem>
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
                </IonItem>
              </IonItemSliding>
            ))}
          </div>
          {showModal && (
            <Verse dynamicPath={dynamicPath} onClose={closeModal} />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default ExploreContainer;
