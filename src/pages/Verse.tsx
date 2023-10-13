import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";

import { useSwipeable } from "react-swipeable";

import {
  IonActionSheet,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonItem,
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
  backspace,
  arrowBack,
  eyeOff,
  refresh,
  ellipsisHorizontal,
  settingsOutline,
  arrowForward,
  toggle,
} from "ionicons/icons";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import "../theme/variables.css";
import { useAuth0 } from "@auth0/auth0-react";

let groupName = "";

const Verse: React.FC = () => {
  const [settings, setSettings] = useState<any[]>([]);
  const { user } = useAuth0();
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [hiddenWordIndices, setHiddenWordIndices] = useState<number[]>([]);
  const [finishButtonClicks, setFinishButtonClicks] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isFirstLetterMode, setIsFirstLetterMode] = useState(false);
  const [originalSentences, setOriginalSentences] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  let groupName = "";
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  useEffect(() => {
    const initialSentences = [
      "This is the first sentence.",
      "This is the second sentence.",
      // Add more sentences as needed
    ];
    let dat = {
      username: user.name,
    };
    const requestOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dat),
    };
    fetch("https://www.roadsbible.com/api/settings/", requestOption)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSettings(data);
      });

    const location = window.location.href;
    groupName = location.split("/").slice(-1)[0];
    console.log(groupName);
    fetch("https://www.roadsbible.com/roads/" + groupName + "/", requestOption)
      .then((response) => response.json())
      .then((data) => {
        const verses = data.verses.map(
          (verse: any) => `${verse.verse} ${verse.reference}`
        );
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
        } else {
          console.error("Error:", progressData.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    loadProgress();
  }, [currentSentenceIndex, user.name]);

  const toggleFirstLetterMode = () => {
    setSentences((prevSentences) => {
      if (!isFirstLetterMode) {
        const newSentences = [...prevSentences];
        newSentences.forEach((sentence, index) => {
          originalSentences[index] = sentence;
          const words = sentence.split(" ");
          const firstLetters = words
            .filter((word) => word.length > 0)
            .map((word) => {
              if (!isNaN(parseInt(word[0]))) {
                return word;
              } else {
                return word[0].toUpperCase().replace(/["()]/g, "");
              }
            })
            .join(" ");
          newSentences[index] = firstLetters;
        });
        setIsFirstLetterMode(true);
        return newSentences;
      } else {
        const newSentences = [...prevSentences];
        newSentences.forEach((sentence, index) => {
          newSentences[index] = originalSentences[index];
        });
        setIsFirstLetterMode(false);
        return newSentences;
      }
    });
  };

  useEffect(() => {
    if (settings.length > 0) {
      if (settings[0].fields.defaultmode === "randomWord") {
        console.log("Random word");
      } else {
        toggleFirstLetterMode();
      }
    }
  }, [settings, isFirstLetterMode]);

  const closeActionSheet = () => {
    setIsFabOpen(false);
  };

  const hideRandomWords = (numWords: number) => {
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

    const randomIndices: number[] = [];
    while (randomIndices.length < numWords && visibleWordIndices.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * visibleWordIndices.length
      );
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
    const words = currentSentence.split(" ");

    const allHiddenIndices = words.map((_, index) => index);
    setHiddenWordIndices(allHiddenIndices);
  };

  const revealAllWords = () => {
    setHiddenWordIndices([]);
  };

  const moveToNextSentence = () => {
    if (currentSentenceIndex >= sentences.length - 1) {
      console.log("You have finished all the sentences.");
      hapticsImpactMedium();
      setCurrentSentenceIndex((prevIndex) => prevIndex + 1);

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

    async function saveProgress() {
      await fetch("https://www.roadsbible.com/api/save_progress/", requestOptions);
    }

    saveProgress();
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

      async function saveProgress() {
        await fetch("https://www.roadsbible.com/api/save_progress/", requestOptions);
      }

      saveProgress();
    } else {
      console.log("You are already at the beginning.");
      hapticsImpactMedium();
    }
  };

  const style = {
    "--background": "var(--ion-background)",
  } as React.CSSProperties;
  const handlers = useSwipeable({
    onSwipedLeft: moveToNextSentence,
    onSwipedRight: backButtonClicked,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"></IonButtons>
            <IonTitle>{groupName}</IonTitle>
            <IonButtons slot="end">
              <IonButton id="open-action-sheet">
                <IonIcon icon={settingsOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonActionSheet
            trigger="open-action-sheet"
            onDidDismiss={closeActionSheet}
            header="Actions"
            buttons={[
              {
                text: isFirstLetterMode
                  ? "Random Word Mode"
                  : "First Letter Mode",
                handler: toggleFirstLetterMode,
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
                handler: () => {
                  location.href = "/tabs/";
                },
              },
            ]}
            onDidDismiss={({ detail }) =>
              console.log(`Dismissed with role: ${detail.role}`)
            }
            isOpen={showAlert}
            header="You're Done!"
            message="Hooray! 🎉 You've finished this road."
          ></IonAlert>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
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
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    margin: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  <IonButtons>
                    <IonButton onClick={backButtonClicked}>
                      <IonIcon size="medium" icon={arrowBack} />
                    </IonButton>
                    <IonButton
                      onClick={() => hideRandomWords(3)}
                      style={{ margin: "0 0.5rem" }}
                    >
                      <IonIcon size="medium" icon={backspace} />
                    </IonButton>
                    <IonButton
                      onClick={hideAllWords}
                      style={{ margin: "0 0.5rem" }}
                    >
                      <IonIcon size="medium" icon={eyeOff} />
                    </IonButton>
                    <IonButton onClick={revealAllWords}>
                      <IonIcon size="medium" icon={refresh} />
                    </IonButton>
                    <IonButton onClick={moveToNextSentence}>
                      <IonIcon size="medium" icon={arrowForward} />
                    </IonButton>
                  </IonButtons>
                </div>
              </div>
            )}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Verse;
