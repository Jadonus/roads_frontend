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
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { user } = useAuth0();
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    book: "",
    chapter: "",
    verse: "",
  });

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
      username: user.name,
    };
    const requestOption: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://www.roadsbible.com/api/newroad/", requestOption)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
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
        <IonList inset color="light">
          <IonItem>
            <IonInput
              type="text"
              name="name"
              value={formInputs.name}
              placeholder="The Name Of your Road"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              name="description"
              value={formInputs.description}
              placeholder="Description of your road"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem>
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
          <IonItem>
            <IonInput
              type="number"
              name="chapter"
              value={formInputs.chapter}
              placeholder="Chapter"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="number"
              name="verse"
              value={formInputs.verse}
              placeholder="Verse"
              onIonInput={handleInputChange}
            ></IonInput>
          </IonItem>
          <IonButtons>
            <IonButton fill="clear" onClick={handleAddVerse}>
              Add Verse
            </IonButton>
            <IonButton
              fill="clear"
              disabled={!verseData ? true : false}
              onClick={push}
            >
              Submit
            </IonButton>
          </IonButtons>
        </IonList>
        <IonList>
          {verseData.map((verse, index) => (
            <IonItem key={index}>
              <IonLabel>
                {bookofbiblelist[verse.book_id - 1]} {verse.chapter}:
                {verse.verse_number}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Makeroad;
