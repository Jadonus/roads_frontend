import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonLabel,
  IonTitle,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonNote,
  IonBackButton,
  IonAlert,
  IonButtons,
} from "@ionic/react";

import { isauth } from "./isauth";
function Makeroad() {
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
  // A simple utility function to get the username from wherever you store it
  let username = isauth.value;
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    book: "",
    chapter: "",
    verse: "",
  });
  const [success, setSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [verseData, setVerseData] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  // Function to handle book input and suggestions
  const handleBookInput = (input) => {
    setFormInputs({
      ...formInputs,
      book: input,
    });

    const lowerInput = input.toLowerCase();

    const filteredSuggestions = bookofbiblelist.filter((book) =>
      book.toLowerCase().includes(lowerInput)
    );

    setSuggestions(filteredSuggestions);
  };

  // Function to handle selecting a suggestion
  const handleSuggestionClick = (suggestion) => {
    setFormInputs({
      ...formInputs,
      book: suggestion,
    });
    setSuggestions([]);
  };

  // Function to get the ID of the selected book
  const getBookId = (bookName) => {
    const bookId = bookofbiblelist.indexOf(bookName);
    return bookId + 1;
  };

  const handleAddVerse = () => {
    const { name, description, book, chapter, verse } = formInputs;
    if (name && book && chapter && verse) {
      const bookId = getBookId(book);

      const newVerse: any = {
        book_id: bookId,
        chapter: parseInt(chapter),
        verse_number: parseInt(verse),
      };

      if (verseData.length === 0) {
        newVerse.description = description;

        newVerse.url = `/roads/${name}`;
      }

      setVerseData([...verseData, newVerse]);
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    console.log(verseData);
  }, [verseData]);
  function push() {
    let data = {
      verses: verseData,
      title: formInputs.name,
      username: username,
    };
    const requestOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://www.roadsbible.com/api/newroad/", requestOption)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming you want to parse the response as JSON
      })
      .then((data) => {
        // Your code to handle the data if the response is successful
        setSuccess(true);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const handleRemoveVerse = (index) => {
    const updatedVerseData = verseData.filter((_, i) => i !== index);
    setVerseData(updatedVerseData);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle size="large">Make A Road.</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonNote>
            Please Make Sure the verses you pick exist before entering them.
            Only one verse at a time.
          </IonNote>
        </IonList>
        <IonList inset>
          <IonItem color="light">
            <IonInput
              type="text"
              name="name"
              value={formInputs.name}
              placeholder="The Name Of your Road"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem color="light">
            <IonInput
              type="text"
              name="description"
              value={formInputs.description}
              placeholder="Description of your road"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem color="light">
            {/* Replace IonSelect with IonSearchbar for book input */}
            <IonInput
              name="book"
              value={formInputs.book}
              placeholder="Book of your verse"
              onIonInput={(e) => handleBookInput(e.detail.value)}
            ></IonInput>
            <div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </IonItem>
          <IonItem color="light">
            <IonInput
              type="number"
              name="chapter"
              value={formInputs.chapter}
              placeholder="Chapter"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem color="light">
            <IonInput
              type="number"
              name="verse"
              value={formInputs.verse}
              placeholder="Verse"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem color="light">
            <IonButtons>
              <IonButton fill="clear" color="primary" onClick={handleAddVerse}>
                Add Verse
              </IonButton>
              <IonButton
                color="primary"
                fill="clear"
                disabled={verseData.length === 0}
                onClick={push}
              >
                Submit
              </IonButton>
            </IonButtons>
          </IonItem>
        </IonList>
        <IonList>
          {verseData.map((verse, index) => (
            <IonItem key={index} onClick={() => handleRemoveVerse(index)}>
              <IonLabel>
                {bookofbiblelist[verse.book_id - 1]} {verse.chapter}:
                {verse.verse_number}
              </IonLabel>
            </IonItem>
          ))}
          <IonNote className="ion-padding">
            Tap on the verses you want to remove.
          </IonNote>
        </IonList>
        {success ? (
          <>
            {" "}
            <IonAlert
              trigger="present-alert"
              header="Success!"
              message="Your Road has been created succesfully."
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: () => {
                    console.log("Alert canceled");
                  },
                },
                {
                  text: "OK",
                  role: "confirm",
                  handler: () => {
                    location.href = `https://dashboard.roadsbible.com/tabs/dashboard/`;
                  },
                },
              ]}
              isOpen={true}
              onDidDismiss={({ detail }) =>
                console.log(`Dismissed with role: ${detail.role}`)
              }
            ></IonAlert>
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
}

export default Makeroad;
