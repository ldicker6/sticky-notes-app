import "../style.css";

const createStickyNotesApp = () => {
  //state variables managed through closures
  let notes = [];
  let nextNoteId = 0;

  //grab the DOM elements before removing them during render
  const section = document.getElementById("notes-wall");
  const newNoteInput = document.getElementById("new-note");

  const childDiv = section.querySelector("div");
  const note_classList = [...childDiv.classList];
  const childButton = section.querySelector("button");
  const garbage_classList = [...childButton.classList];
  const textArea = section.querySelector("textarea");
  const text_classList = [...textArea.classList];

  //helper to generate unique note objects
  const createNoteObject = (noteText) => ({
    id: nextNoteId++,
    text: noteText,
  });

  //pure function to add a new note immutably
  const addNewNote = (noteText, notesArray) => [
    ...notesArray,
    createNoteObject(noteText),
  ];

  //pure function to remove a note immutably
  const removeNote = (noteId, notesArray) =>
    notesArray.filter((note) => note.id !== noteId);

  //"" update a note's text
  const updateNote = (noteId, newText, notesArray) =>
    notesArray.map((note) =>
      note.id === noteId ? { ...note, text: newText } : note,
    );

  //function to clear the notes wall and render updated notes
  const renderNotes = (notesArray) => {
    section.innerHTML = ""; //clear the current list
    notesArray.forEach((note) => renderNoteItem(note));
  };

  //function to handle creating a new sticky note DOM element
  const createStickyNoteElement = (noteText, noteId) => {
    const noteItem = document.createElement("div");
    noteItem.id = noteId;

    //assign classes immutably
    note_classList.forEach((cls) => noteItem.classList.add(cls));

    //create delete button
    const deleteBtn = createDeleteButton(noteId);
    noteItem.appendChild(deleteBtn);

    //create note content
    const noteTextDiv = createNoteTextDiv(noteText);
    const noteTextArea = createNoteTextArea(noteText);

    noteItem.appendChild(noteTextDiv);
    noteItem.appendChild(noteTextArea);

    noteItem.addEventListener("dblclick", () => handleEditNoteMode(noteItem));
    addSaveListenerToTextArea(noteItem);
    return noteItem;
  };

  //function to create the delete button
  const createDeleteButton = (noteId) => {
    const deleteBtn = document.createElement("button");
    garbage_classList.forEach((cls) => deleteBtn.classList.add(cls));
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
      notes = removeNote(noteId, notes);
      renderNotes(notes);
    });
    return deleteBtn;
  };

  //function to create the note's display text
  const createNoteTextDiv = (noteText) => {
    const noteTextDiv = document.createElement("div");
    noteTextDiv.classList.add("p-4", "note-text");
    noteTextDiv.innerHTML = noteText.replace(/\n/g, "<br>");
    return noteTextDiv;
  };

  //function to create the text area for editing
  const createNoteTextArea = (noteText) => {
    const noteTextArea = document.createElement("textarea");
    text_classList.forEach((cls) => noteTextArea.classList.add(cls));
    noteTextArea.value = noteText;
    noteTextArea.classList.add("note-edit", "hidden");
    return noteTextArea;
  };

  //function to handle rendering a single note
  const renderNoteItem = (note) => {
    const noteElement = createStickyNoteElement(note.text, note.id);
    section.appendChild(noteElement);
  };

  //function to handle new note creation
  const handleNewNoteCreation = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const noteText = event.target.value.trim();
      if (noteText) {
        notes = addNewNote(noteText, notes);
        renderNotes(notes);
      }
      event.target.value = ""; // Reset the textarea
    }
  };

  //function to handle editing a note
  const handleEditNoteMode = (noteElement) => {
    const noteTextDiv = noteElement.querySelector(".note-text");
    const noteTextArea = noteElement.querySelector(".note-edit");
    toggleEditMode(noteTextDiv, noteTextArea);
  };

  //function to toggle between display and edit mode
  const toggleEditMode = (noteTextDiv, noteTextArea) => {
    noteTextDiv.style.display = "none";
    noteTextArea.classList.remove("hidden");
    noteTextArea.focus();
    document.addEventListener("click", (event) =>
      handleClickOutside(event, noteTextArea, noteTextDiv),
    );
  };

  //function to handle click outside the note and save changes
  const handleClickOutside = (event, noteTextArea, noteTextDiv) => {
    if (!noteTextArea.contains(event.target)) {
      saveNoteEdits(noteTextArea, noteTextDiv);
    }
  };

  //function to save edits made to a note
  const saveNoteEdits = (noteTextArea, noteTextDiv) => {
    const noteId = Number(noteTextArea.parentNode.id);
    notes = updateNote(noteId, noteTextArea.value, notes);
    noteTextDiv.innerHTML = noteTextArea.value.replace(/\n/g, "<br>");
    toggleBackToDisplayMode(noteTextDiv, noteTextArea);
  };

  //function to toggle back to display mode
  const toggleBackToDisplayMode = (noteTextDiv, noteTextArea) => {
    noteTextArea.classList.add("hidden");
    noteTextDiv.style.display = "block";
  };

  //add save listener to the text area with this function
  const addSaveListenerToTextArea = (noteElement) => {
    const noteTextArea = noteElement.querySelector(".note-edit");
    noteTextArea.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" && !event.shiftKey) ||
        event.key === "Escape"
      ) {
        event.preventDefault();
        saveNoteEdits(noteTextArea, noteElement.querySelector(".note-text"));
      }
    });
  };

  //initialize app with event listener and render notes
  newNoteInput.addEventListener("keydown", handleNewNoteCreation);
  renderNotes(notes);
};

//Run the sticky notes app
createStickyNotesApp();
