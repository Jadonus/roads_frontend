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
  dynamicPath: string;
  userr: boolean;
  index: number;
  onClose?: () => void; // Function to close the modal (optional)
}

interface ContainerProps {}
const Verse: React.FC<VerseModalProps> = ({
  dynamicPath,
  onClose,
  userr,
  index,
}) => {
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
      fetch("https://www.roadsbible.com" + dynamicPath + "/", requestOption)
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
          if (settings.length > 0) {
            if (settings[0].fields.defaultmode === "randomWord") {
              console.log("Random word");
            } else {
              toggleFirstLetterMode();
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching verses:", error);
        });
    }
  }, [settings]);

  var dynamic = dynamicPath.replace("/roads/", "");
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = {
          username: username,
          road: dynamic,
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
    if (index !== undefined) {
      setCurrentSentenceIndex(index);
    }
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
    hapticsImpactMedium();
    setHiddenWordIndices((prevHiddenWordIndices) =>
      prevHiddenWordIndices.concat(randomIndices)
    );
  };

  const hideAllWords = () => {
    hapticsImpactMedium();
    const currentSentence = sentences[currentSentenceIndex];
    console.log(currentSentence);
    const words = currentSentence.split(" ");

    const allHiddenIndices = words.map((_, index) => index);
    setHiddenWordIndices(allHiddenIndices);
    console.log("hideing");
  };

  const revealAllWords = () => {
    hapticsImpactMedium();
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
      username: username,
      road: dynamic,
      index: currentSentenceIndex + 1,
      isCustom: userr,
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
        username: username,
        road: dynamic,
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
    if (isFirstLetterModeRef.current) {
      return;
    }

    isFirstLetterModeRef.current = true;

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
                return word;
              } else {
                return word[0].toUpperCase().replace(/["()]/g, "");
              }
            })
            .join(" ");
          newSentences[index] = firstLetters;
        });
        setIsFirstLetterMode(true);

        isFirstLetterModeRef.current = false;
        return newSentences;
      } else {
        // Exit First Letter Mode and restore original content
        const newSentences = [...prevSentences];
        newSentences.forEach((sentence, index) => {
          newSentences[index] = originalSentences[index];
        });
        setIsFirstLetterMode(false);

        isFirstLetterModeRef.current = false;
        return newSentences;
      }
    });
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
  const bookofbiblelist = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song of Solomon",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Thessalonians",
    "2 Thessalonians",
    "1 Timothy",
    "2 Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "1 John",
    "2 John",
    "3 John",
    "Jude",
    "Revelation",
  ];
  function readContext() {
    let refeer = refer.verses[currentSentenceIndex].reference;
    console.log(refeer);
    const match = refeer.match(/(\d?\s?[A-Z][a-z]+)\s(\d+):\d+\s\((\w+)\)/);
    if (!match) {
      return null; // Invalid reference
    }

    const [, boook, chapter, translation] = match;

    // Now, let's check if the extracted book is in the bookofbiblelist
    const validBooks = bookofbiblelist.map((bookName) =>
      bookName.toLowerCase()
    );
    const bookIndex = validBooks.indexOf(boook.toLowerCase());

    if (bookIndex === -1) {
      return null; // Book not found in the list
    }
    console.log("book", bookIndex);

    console.log("chapter", chapter);

    console.log("translation", translation);
    window.open(
      `https://bible-ui.rkeplin.com/book/${translation.toLowerCase()}/${
        bookIndex + 1
      }/${chapter}`
    );
  }
  function togg() {}
  function flashcard() {
    window.open(
      `https://www.roadsbible.com/api/pdf/?title=${dynamic}&username=${username}&custom=${custom}`
    );
    // Now you can create a link or embed the PDF
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Done</IonButton>{" "}
            {/* Clicking this button will close the modal */}
          </IonButtons>
          <IonTitle>{dynamic}</IonTitle>

          <IonButtons slot="start">
            <IonButton id="open-action-sheet">
              <IonIcon icon={sparkles}></IonIcon>
            </IonButton>
            <IonButton>
              {refer &&
                refer.verses &&
                refer.verses.length > 0 &&
                refer.verses[currentSentenceIndex] &&
                refer.verses[currentSentenceIndex].reference && (
                  <Hearticon
                    title={dynamicPath}
                    verse={refer.verses[currentSentenceIndex].reference}
                    index={currentSentenceIndex}
                    favoritedIndexes={favoritedIndexes} // Pass the favoritedIndexes state
                  />
                )}
            </IonButton>
          </IonButtons>
          <IonProgressBar
            value={parseFloat(
              (currentSentenceIndex / sentences.length).toFixed(2)
            )}
          ></IonProgressBar>
        </IonToolbar>
      </IonHeader>

      <IonContent {...handlers}>
        <IonModal isOpen={info}>
          <Copyright onClose={() => setInfo(false)} />
        </IonModal>
        <IonActionSheet
          trigger="open-action-sheet"
          header="Quick Actions"
          buttons={[
            {
              icon: text,
              text: isFirstLetterMode
                ? "Random Word Mode"
                : "First Letter Mode",
              handler: () => {
                toggleFirstLetterMode();
              },
            },

            {
              icon: documents,

              text: "Copyright info.",
              handler: () => {
                setInfo(true);
              },
            },
            dynamicPath !== "verseoftheday"
              ? {
                  icon: book,
                  text: "Read verse context",
                  handler: () => {
                    readContext();
                  },
                }
              : null,
            dynamicPath !== "verseoftheday"
              ? {
                  icon: bookmark,
                  text: "Print flashcards",
                  handler: () => {
                    flashcard();
                  },
                }
              : null,
            {
              icon: close,
              text: "Cancel",
              role: "cancel",
              data: {
                action: "cancel",
              },
            },
          ]}
        ></IonActionSheet>
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
                onClose();
              },
            },
          ]}
          onDidDismiss={({ detail }) =>
            console.log(`Dismissed with role: ${detail.role}`)
          }
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
            height: "100vh",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          {sentences.length === 0 ? (
            <IonLoading
              translucent={true}
              isOpen={true}
              backdrop-dismiss
              message="Loading..."
            />
          ) : (
            <div style={{}}>
              <h1 className="ion-text-center">
                {sentences.length === 0 ? (
                  <IonLoading
                    isOpen={true}
                    translucent={true}
                    backdrop-dismiss
                    message="Loading..."
                  />
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly", // This will evenly space out the buttons
                  margin: "1rem",
                  marginTop: "2rem",
                }}
              >
                <IonButtons>
                  {dynamicPath !== "verseoftheday" ? (
                    <IonButton onClick={backButtonClicked}>
                      <IonIcon size="medium" icon={arrowBack} />
                    </IonButton>
                  ) : null}
                  <>
                    <IonButton
                      onClick={() => hideRandomWords(3)}
                      style={{ margin: "0 0.5rem" }}
                      ref={hide}
                    >
                      <IonIcon size="medium" icon={backspace} />
                    </IonButton>
                    <IonButton
                      onClick={hideAllWords}
                      style={{ margin: "0 0.5rem" }}
                      ref={all}
                    >
                      <IonIcon size="medium" icon={eyeOff} />
                    </IonButton>
                    <IonButton onClick={revealAllWords} ref={undo}>
                      <IonIcon size="medium" icon={refresh} />
                    </IonButton>{" "}
                  </>
                  {/* <div>
                      {" "}
                      <IonButton onClick={togg} style={{ margin: "0 0.5rem" }}>
                        <IonIcon size="medium" icon={documentText} />
                      </IonButton>
                </div> */}
                  {dynamicPath !== "verseoftheday" ? (
                    <IonButton onClick={moveToNextSentence}>
                      <IonIcon size="medium" icon={arrowForward} />
                    </IonButton>
                  ) : null}
                </IonButtons>
                <h1 style={{ display: "none" }}>{currentSentenceIndex}</h1>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
};
export default Verse;
