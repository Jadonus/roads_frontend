import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

import { useSwipeable } from "react-swipeable";

import {
  IonActionSheet,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonPage,
  IonMenu,
  IonContent,
  IonCardTitle,
  IonHeader,
  IonAlert,
  IonCardHeader,
  IonCard,
  IonLabel,
  IonSkeletonText,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
  IonSpinner,
  IonProgressBar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
  backspaceOutline,
  arrowBackOutline,
  eyeOffOutline,
  refreshOutline,
  settingsOutline,
  arrowForwardOutline,
} from "ionicons/icons";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import "../theme/variables.css";
import { useAuth0 } from "@auth0/auth0-react";
let groupName = "";
interface ContainerProps {}
const Verse: React.FC<ContainerProps> = () => {
  const { user } = useAuth0();
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [hiddenWordIndices, setHiddenWordIndices] = useState([]);
  const [finishButtonClicks, setFinishButtonClicks] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isFirstLetterMode, setIsFirstLetterMode] = useState(false); // State to track the mode
  const [originalSentences, setOriginalSentences] = useState([]); // Initialize as an empty array
  const [showAlert, setShowAlert] = useState(false); // State to track if the alert is visible
  const [isFabOpen, setIsFabOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false); // State to track if the ActionSheet is open
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  useEffect(() => {
    // For simplicity, I'm using placeholder sentences.
    const initialSentences = [
      "This is the first sentence.",
      "This is the second sentence.",
      // Add more sentences as needed
    ];

    const location = window.location.href;
    groupName = location.split("/").slice(-1)[0];
    console.log(groupName);
    fetch("https://www.roadsbible.com/roads/" + groupName)
      .then((response) => response.json())
      .then((data) => {
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
  }, []);
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = {
          username: user.name,
          road: groupName,
          index: currentSentenceIndex,
        };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        const response = await fetch(
          "https://www.roadsbible.com/api/get_saved_progress/",
          requestOptions
        );
        const progressData = await response.json();
        if (response.status === 200) {
          const savedIndex = progressData.progress.index;
          setCurrentSentenceIndex(savedIndex);
        } else if (response.status === 404) {
          console.log("No progress found");
          // Handle the case when no progress is found (starting from the beginning).
        } else {
          // Handle other error cases as needed.
          console.error("Error:", progressData.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Load progress when the component mounts or when the currentSentenceIndex changes
    loadProgress();
  }, []);

  const closeActionSheet = () => {
    setIsOpen(false);
  };
  const hideRandomWords = (numWords) => {
    const currentSentence = sentences[currentSentenceIndex];
    const words = currentSentence.split(" ");

    const visibleWordIndices = words
      .map((_, index) => index)
      .filter((index) => hiddenWordIndices.indexOf(index) === -1);

    if (visibleWordIndices.length === 0) {
      console.log("No visible words left to hide.");
      return;
    }

    numWords = Math.min(numWords, visibleWordIndices.length);

    const randomIndices = [];
    while (randomIndices.length < numWords && visibleWordIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * visibleWordIndices.length);
      const randomVisibleIndex = visibleWordIndices[randomIndex];
      randomIndices.push(randomVisibleIndex);
      visibleWordIndices.splice(randomIndex, 1);
    }

    setHiddenWordIndices((prevHiddenWordIndices) =>
      prevHiddenWordIndices.concat(randomIndices)
    );
  };

  const hideAllWords = () => {
    const currentSentence = sentences[currentSentenceIndex];
    console.log(currentSentence);
    const words = currentSentence.split(" ");

    const allHiddenIndices = words.map((_, index) => index);
    setHiddenWordIndices(allHiddenIndices);
    console.log("hideing");
  };

  const revealAllWords = () => {
    setHiddenWordIndices([]);
  };

  const moveToNextSentence = () => {
    if (currentSentenceIndex >= sentences.length - 1) {
      console.log("You have finished all the sentences.");
      hapticsImpactMedium();
      setCurrentSentenceIndex((prevIndex) => prevIndex + 1); // Increment index first

      setShowAlert(true);
      return;
    }

    setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
    setHiddenWordIndices([]);

    const data = {
      username: user.name,
      road: groupName,
      index: currentSentenceIndex + 1,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    async function savepro() {
      await fetch(
        "https://www.roadsbible.com/api/save_progress/",
        requestOptions
      );
    }
    savepro();
  };

  const finishButtonClicked = () => {
    if (finishButtonClicks === 0) {
      hideAllWords();
      setFinishButtonClicks(1);
    } else if (finishButtonClicks === 1) {
      revealAllWords();
      setIsHidden(false);
      setFinishButtonClicks(0);
    }
  };

  const backButtonClicked = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex((prevIndex) => prevIndex - 1);
      setHiddenWordIndices([]);
      const data = {
        username: user.name,
        road: groupName,
        index: currentSentenceIndex - 1,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      async function savepro() {
        await fetch(
          "https://www.roadsbible.com/api/save_progress/",
          requestOptions
        );
      }
      savepro();
    } else {
      console.log("You are already at the beginning.");
      hapticsImpactMedium();
    }
  };
  const toggleFirstLetterMode = () => {
    setSentences((prevSentences) => {
      if (!isFirstLetterMode) {
        // Enter First Letter Mode
        const newSentences = [...prevSentences];
        newSentences.forEach((sentence, index) => {
          // Store the original content
          originalSentences[index] = sentence;
          // Replace the content with first letters
          const words = sentence.split(" ");
          const firstLetters = words
            .filter((word) => word.length > 0)
            .map((word) => {
              if (!isNaN(word[0])) {
                // If the first character is a number, keep it as-is
                return word;
              } else {
                return word[0].toUpperCase().replace(/["()]/g, ""); // Use regular expressions to remove double quotes and parentheses
              }
            })
            .join(" ");
          newSentences[index] = firstLetters;
        });
        setIsFirstLetterMode(true);
        return newSentences;
      } else {
        // Exit First Letter Mode and restore original content
        const newSentences = [...prevSentences];
        newSentences.forEach((sentence, index) => {
          newSentences[index] = originalSentences[index];
        });
        setIsFirstLetterMode(false);
        return newSentences;
      }
    });
  };
    const style = { "--background": 'var(--ion-background)' } as React.CSSProperties;
 const handlers = useSwipeable({
    onSwipedLeft: moveToNextSentence,
    onSwipedRight: backButtonClicked,
  });


  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
            </IonButtons>
            <IonTitle>{groupName}</IonTitle>
            <IonButtons slot="end">
              <IonButton id="open-action-sheet">
                <IonIcon icon={settingsOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonActionSheet
            trigger="open-action-sheet"
            onDidDismiss={closeActionSheet} // Close the ActionSheet when anything is clicked outside
            header="Actions"
            buttons={[
              {
                text: isFirstLetterMode
                  ? "Random Word Mode"
                  : "First Letter Mode",
                handler: toggleFirstLetterMode, // Toggle the mode when the button is clicked
              },
              {
                text: "Verse Info",
                data: {
                  action: "share",
                },
              },
              {
                text: "Cancel",
                role: "cancel",
                data: {
                  action: "cancel",
                },
              },
            ]}
          ></IonActionSheet>
        </IonHeader>

              <IonContent {...handlers}>

          <IonAlert
            onDidDismiss={() => (location.href = "/")}
            buttons={["Great!"]}
            isOpen={showAlert}
            header="Your Done!"
            message="Horray! 🎉 You finished this road."
          ></IonAlert>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
            }}
          >
            {sentences.length === 0 ? (
              <IonSpinner
                style={{ margin: "auto", width: "5rem", height: "5rem" }}
                name="dots"
              ></IonSpinner>
            ) : (
              <div style={{ padding: "20px" }}>
                <h1 className="ion-text-center">
                  {sentences.length === 0 ? (
                    <IonSpinner
                      style={{ margin: "auto", width: "5rem", height: "5rem" }}
                      name="dots"
                    ></IonSpinner>
                  ) : (

                    <span>
                      {currentSentenceIndex < sentences.length &&
                        sentences[currentSentenceIndex]
                          .split(" ")
                          .map((word, index) => (
                            <span
                              key={index}
                              className={
                                hiddenWordIndices.includes(index)
                                  ? "hide-word"
                                  : ""
                              }
                            >
                              {word}{" "}

                            </span>

                          ))}

                    </span>

                  )}
                </h1>
                <div style={{ margin: "-1rem", marginTop: "2rem" }}>
                  <IonProgressBar
                    value={parseFloat(
                      (currentSentenceIndex / sentences.length).toFixed(2)
                    )}
                  ></IonProgressBar>
                </div>
              </div>
            )}

</div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <IonButton
              shape="round"
                onClick={() => hideRandomWords(3)}
                style={{ margin: "0 0.5rem" }} className="color"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IonLabel>Hide</IonLabel>
                </div>
              </IonButton>

              <IonButton 
              
              shape="round"
              className="color" onClick={hideAllWords} style={{ margin: "0 0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IonLabel>Hide All</IonLabel>
                </div>
              </IonButton>

              <IonButton

              shape="round"
                onClick={revealAllWords}
                style={{ margin: "0 0.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IonLabel>Undo</IonLabel>
                </div>
              </IonButton>
</div>
        </IonContent>
       
         
          
      </IonPage>
    </>
  );
};
export default Verse;
