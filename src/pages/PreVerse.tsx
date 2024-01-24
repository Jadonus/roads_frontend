import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

import { useSwipeable } from "react-swipeable";
let groupName;
import {
  IonFooter,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonAlert,
  IonIcon,
  IonActionSheet,
  IonModal,
  IonSpinner,
  IonProgressBar,
  IonAvatar,
  IonImg,
  IonLoading,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
  backspace,
  arrowBack,
  eyeOff,
  refresh,
  heartOutline,
  ellipsisHorizontal,
  settingsOutline,
  arrowForward,
  documentText,
  sparkles,
  text,
  documents,
  book,
  bookmark,
  close,
} from "ionicons/icons";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import "../theme/variables.css";
import { isauth } from "./isauth";

import Hearticon from "../components/heart";
import Copyright from "./copyright";
interface VerseModalProps {
  userr: boolean;
  index: number;
  onClose?: () => void; // Function to close the modal (optional)
}
interface RouteParams {
  dynamicPath: string;
}

interface ContainerProps {}
const PreVerse: React.FC<VerseModalProps> = ({ onClose, userr, index }) => {
  const { dynamicPath } = useParams<RouteParams>();
  console.log("id", index);
  const [settings, setSettings] = useState([]);
  let username = isauth.value;
  const [sentences, setSentences] = useState([]);
  const undo = useRef(null);
  const hide = useRef(null);
  const all = useRef(null);
  const [refer, setRefer] = useState<{ verses: any[] }>({ verses: [] });
  const [dis, setDis] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [hiddenWordIndices, setHiddenWordIndices] = useState([]);
  const [finishButtonClicks, setFinishButtonClicks] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isFirstLetterMode, setIsFirstLetterMode] = useState(false); // State to track the mode
  const [originalSentences, setOriginalSentences] = useState([]); // Initialize as an empty array
  const [showAlert, setShowAlert] = useState(false); // State to track if the alert is visible
  const [isFabOpen, setIsFabOpen] = useState(true);
  const isFirstLetterModeRef = useRef(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const [favoritedIndexes, setFavoritedIndexes] = useState([]);
  const [info, setInfo] = useState(false);
  const [shouldRerender, setShouldRerender] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to track if the ActionSheet is open
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  interface Data {
    verses: any[]; // You can replace 'any' with a more specific type if you know the structure.
    // Other properties if 'data' has them
  }
  let custom = "no";
  if (userr) {
    custom = "yes";
  }
  const toggleFirstLetterModeCallback = useCallback(() => {}, [
    settings,
    isFirstLetterMode,
  ]);
  let dat;
  if (userr == true) {
    dat = {
      username: username,
      title: dynamic,
      custom: "yes",
    };
  } else {
    dat = {
      username: username,
      title: dynamic,
      custom: "no",
    };
  }
  const requestOption: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dat),
  };
  async function sett() {
    await fetch("https://www.roadsbible.com/api/settings/", requestOption)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSettings(data);
      });
  }
  useEffect(() => {
    sett();
  }, []);
  useEffect(() => {
    // For simplicity, I'm using placeholder sentences.
    const initialSentences = [
      "This is the first sentence.",
      "This is the second sentence.",
      // Add more sentences as needed
    ];
    let dat;
    if (userr == true) {
      dat = {
        username: username,
        title: dynamic,
        custom: "yes",
      };
    } else {
      dat = {
        username: username,
        title: dynamic,
        custom: "no",
      };
    }
    const requestOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dat),
    };
    const location = window.location.href;
    interface ResponseData {
      dat: any;
    }
    groupName = location.split("/").slice(-1)[0];
    console.log(groupName);
    if (dynamicPath === "verseoftheday") {
      const verseUrl =
        "https://beta.ourmanna.com/api/v1/get?format=json&translation=kjv";

      fetch(verseUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the response as text
        })
        .then((fetchedData) => {
          // Assuming the API response contains the text directly
          let d = [fetchedData];
          const verses = d.map(
            (verse) =>
              `${verse.verse.details.text} ${verse.verse.details.reference}`
          );
          setSentences(verses); // Set the verse to the fetched data as a string
        })
        .catch((error) => {
          console.error("Error fetching verse:", error);
        });
    } else {
      fetch(
        "https://www.roadsbible.com" + "/roads/" + dynamicPath + "/",
        requestOption
      )
        .then((response) => response.json())
        .then((data) => {
          // Specify the structure
          // Use the 'Data' interface here
          setRefer(data);
          setFavoritedIndexes(data.favorites);

          console.log(refer);
          // Extract verses and references from the API response
          const verses = data.verses.map(
            (verse) => `${verse.verse} ${verse.reference}`
          );
          // Update the state with the fetched verses
          setSentences(verses);
        })
        .catch((error) => {
          console.error("Error fetching verses:", error);
        });
    }
  }, [settings, username]);

  var dynamic = dynamicPath.replace("/roads/", "");

  const handlers = useSwipeable({
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Now you can create a link or embed the PDF

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonHeader>{dynamic}</IonHeader>

            <IonButton onClick={onClose}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent {...handlers}>
        <IonModal isOpen={info}>
          <Copyright onClose={() => setInfo(false)} />
        </IonModal>

        <IonAlert
          buttons={[
            {
              text: "Retry",
              role: "cancel",
              handler: () => {
                setCurrentSentenceIndex(0);
              },
            },
            {
              text: "Great!",
              role: "confirm",
              handler: onClose,
            },
          ]}
          onDidDismiss={({ detail }) =>
            console.log(`Dismissed with role: ${detail.role}`)
          }
          isOpen={showAlert}
          header="Your Done!"
          message="Horray! 🎉 You finished this road."
        ></IonAlert>

        {sentences.length === 0 ? (
          <IonLoading
            translucent={true}
            isOpen={true}
            backdrop-dismiss
            message="Loading..."
          />
        ) : (
          <div style={{}}>
            <IonList inset>
              {refer &&
                refer.verses &&
                refer.verses.map((verse, idx) => (
                  <IonItem key={idx}>
                    <p>{verse.reference}</p>
                  </IonItem>
                ))}
            </IonList>
          </div>
        )}
      </IonContent>
    </>
  );
};
export default PreVerse;
