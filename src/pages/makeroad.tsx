import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
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

  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    book: "",
    reference: "",
  });

  const [verseData, setVerseData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const handleAddVerse = () => {
    const { name, description, book, reference } = formInputs;
    if (name && book && reference) {
      const [bookName, chapter, verseNumber] = reference.split(":");
      if (bookofbiblelist.includes(bookName)) {
        setVerseData([
          ...verseData,
          {
            book: bookName,
            chapter: chapter,
            verse: verseNumber,
            title: name,
            description: description,
          },
        ]);
        setFormInputs({
          name: "",
          description: "",
          book: "",
          reference: "",
        });
      } else {
        alert("Invalid book name. Please choose a book from the Bible.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem>
            <IonInput
              type="text"
              name="name"
              value={formInputs.name}
              placeholder="Your Name Here..."
              onIonChange={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              name="description"
              value={formInputs.description}
              placeholder="Description"
              onIonChange={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect
              name="book"
              value={formInputs.book}
              placeholder="Book of your verse"
              onIonChange={handleInputChange}
            >
              {bookofbiblelist.map((book, index) => (
                <IonSelectOption key={index} value={book}>
                  {book}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              name="reference"
              value={formInputs.reference}
              placeholder="Reference (example: Genesis 23:1)"
              onIonChange={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonButton expand="full" onClick={handleAddVerse}>
            Add Verse
          </IonButton>
        </IonList>
        <IonList>
          {verseData.map((verse, index) => (
            <IonItem key={index}>
              <IonLabel>
                {verse.book} {verse.chapter}:{verse.verse} - {verse.title} -{" "}
                {verse.description}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Makeroad;
