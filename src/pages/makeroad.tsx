import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonInput,
  IonItem,
  IonButton,
  IonBackButton,
} from "@ionic/react";

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

  const [bookInput, setBookInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [verseData, setVerseData] = useState([]);
  const [firstVerseAdded, setFirstVerseAdded] = useState(false);
  const [finalInput, setFinalInput] = useState("");
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    book: "",
    reference: "",
  });

  // Function to handle book input and suggestions
  const handleBookInput = (input) => {
    const lowerInput = input.toLowerCase();
    setBookInput(input);

    const filteredSuggestions = bookofbiblelist.filter((book) =>
      book.toLowerCase().startsWith(lowerInput)
    );

    setSuggestions(filteredSuggestions);
  };

  // Function to handle selecting a suggestion
  const handleSuggestionClick = (suggestion) => {
    setBookInput(suggestion);
    setSuggestions([]);
  };

  // Function to add a verse
  const handleAddVerse = () => {
    const bookInputValue = bookInput.toLowerCase();
    const chapterInput = parseInt(formInputs.reference.split(":")[0]);
    const verseNumberInput = parseInt(formInputs.reference.split(":")[1]);
    const nameInputValue = formInputs.name;
    const desc = formInputs.description;

    // Assign the value to finalInput
    setFinalInput(nameInputValue.replace(/\s/g, ""));

    const bookId = bookofbiblelist.indexOf(bookInputValue) + 1;

    if (!firstVerseAdded) {
      setFirstVerseAdded(true);

      setVerseData([
        ...verseData,
        {
          book_id: bookId,
          chapter: chapterInput,
          verse_number: verseNumberInput,
          title: nameInputValue,
          url: `/roads/${nameInputValue}`,
          description: desc,
        },
      ]);
    } else {
      setVerseData([
        ...verseData,
        {
          book_id: bookId,
          chapter: chapterInput,
          verse_number: verseNumberInput,
        },
      ]);
    }
    console.log(formInputs);
    // Clear input fields related to the verse, but not "name" and "description"
    setBookInput("");
    setFormInputs({
      ...formInputs,
      reference: "",
      book: "",
    });
  };
  useEffect(() => {
    console.log(verseData);
  }, [verseData]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton />
          <IonTitle size="large">Make A Road</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonInput
              value={formInputs.name}
              onIonChange={(e) =>
                setFormInputs({ ...formInputs, name: e.detail.value })
              }
              placeholder="Your Name Here..."
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={formInputs.description}
              onIonChange={(e) =>
                setFormInputs({ ...formInputs, description: e.detail.value })
              }
              placeholder="Description"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={bookInput} // Update the value to bookInput
              onIonChange={
                (e) => handleBookInput(e.detail.value) // Update the book input directly
              }
              placeholder="Book of your verse"
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
          <IonItem>
            <IonInput
              value={formInputs.reference}
              onIonChange={(e) =>
                setFormInputs({ ...formInputs, reference: e.detail.value })
              }
              placeholder="Reference (example: 23:1)"
            ></IonInput>
          </IonItem>
          <IonButton onClick={handleAddVerse} fill="clear">
            Add Verse
          </IonButton>
        </IonList>
        <ul id="verseList">
          {verseData.map((verse, index) => (
            <li key={index}>
              {bookofbiblelist[verse.book_id - 1]} {verse.chapter}:
              {verse.verse_number}
            </li>
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
}

export default Makeroad;
