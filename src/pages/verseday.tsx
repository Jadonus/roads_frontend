import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";
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
  IonCardHeader,
  IonCard,
  IonLabel,
  IonSkeletonText,
  IonIcon,
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
let groupName = "";
interface ContainerProps {}
const Verseday: React.FC<ContainerProps> = () => {
const [sentences, setSentences] = useState([]);

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [hiddenWordIndices, setHiddenWordIndices] = useState([]);
  const [finishButtonClicks, setFinishButtonClicks] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isFirstLetterMode, setIsFirstLetterMode] = useState(false); // State to track the mode
  const [originalSentences, setOriginalSentences] = useState([]); // Initialize as an empty array
  const [isOpen, setIsOpen] = useState(false); // State to track if the ActionSheet is open
 
  const [verse, setVerse] = useState<string | null>(null);

useEffect(() => {
  const verseUrl = "https://beta.ourmanna.com/api/v1/get";

  fetch(verseUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Parse the response as text
    })
    .then((fetchedData) => {
      // Assuming the API response contains the text directly
setVerse(fetchedData); // Set the verse to the fetched data as a string

    })
    .catch((error) => {
      console.error("Error fetching verse:", error);
    });
}, []);



  const openActionSheet = () => {
    setIsOpen(true);
  };

  const closeActionSheet = () => {
    setIsOpen(false);
  };
 const hideRandomWords = (numWords) => {
  // Ensure there is a sentence to work with
  if (sentences.length === 1) {
    const currentSentence = sentences[0];
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
  } else {
    console.log("There should be only one sentence for this operation.");
  }
};




  const hideAllWords = () => {
  // Create an array of hidden indices for all sentences
  const allHiddenIndices = sentences.map((sentence) => {
    const words = sentence.split(" ");
    return words.map((_, index) => index);
  });

  // Flatten the array of indices
  const flattenedHiddenIndices = [].concat(...allHiddenIndices);

  setHiddenWordIndices(flattenedHiddenIndices);
  console.log("Hiding all words.");
};


  const revealAllWords = () => {
    setHiddenWordIndices([]);
  };

 const moveToNextSentence = () => {
  if (currentSentenceIndex >= 0 && currentSentenceIndex < sentences.length - 1) {
    setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
    setHiddenWordIndices([]);
  } else {
    console.log("You have finished all the sentences.");
  }
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
  } else {
    console.log("You are already at the beginning.");
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

  const mode = localStorage.getItem("mode");
//useEffect(() => {
//  setTimeout(() => {
  //  if (mode === "firstLetter") {
   //   toggleFirstLetterMode();
    //}
  //}, 0);
//}, []);

return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Verse Of The Day</IonTitle>
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

        <IonContent>
 <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
        <div style={{ padding: "20px" }}>
  <h1 className="ion-text-center">
  {verse ? (
    <span>
      {verse.split(" ").map((word, index) => (
        <span
          key={index}
          className={hiddenWordIndices.includes(index) ? "hide-word" : ""}
        >
          {isFirstLetterMode ? word[0] : word}{" "}
        </span>
      ))}
    </span>
  ) : (
    <IonSpinner
      style={{ margin: "auto", width: "5rem", height: "5rem" }}
      name="dots"
    ></IonSpinner>
  )}
</h1>

  <div style={{ margin: "6rem", marginTop: "2rem" }}>
    <IonProgressBar
value={parseFloat((currentSentenceIndex / sentences.length).toFixed(2))}

      style={{ marginBottom: "1rem" }}
    ></IonProgressBar>
  </div>
</div>
</div>
        </IonContent>
        <IonFooter translucent={true}>
          <IonToolbar>
            <IonButtons
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <IonButton
                onClick={() => hideRandomWords(3)}
                style={{ margin: "0 0.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IonIcon icon={backspaceOutline} size="large" />
                  <IonLabel>Hide</IonLabel>
                </div>
              </IonButton>

              <IonButton onClick={hideAllWords} style={{ margin: "0 0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IonIcon icon={eyeOffOutline} size="large" />
                  <IonLabel>Hide All</IonLabel>
                </div>
              </IonButton>

              <IonButton
                onClick={revealAllWords}
                style={{margin: "0 0.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IonIcon icon={refreshOutline} size="large" />
                  <IonLabel>Undo</IonLabel>
                </div>
              </IonButton>

            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Verseday;
