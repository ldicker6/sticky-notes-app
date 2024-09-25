import "../style.css";

// Define the state of our app
const notes = [
  //  { id: 1, text: "Buy milk"},
  //  { id: 2, text: "Buy bread"},
];

    let nextNoteId = 0;
    let active_note = null;

 // let nextTodoId = 4;
  //let filter = "all"; // can be 'all', 'active', or 'completed'

//function to create a new sticky note to the wall
function createStickyNote(noteText, noteId) {
    //create the container for the sticky note (the yellow box)
    const noteItem = document.createElement("div");
    //give it all of the same attributes as the starter code showed it to have
    noteItem.id = noteId;
    noteItem.classList.add(
        "relative", 
        "w-40", 
        "h-40", 
        "p-0", 
        "m-2", 
        "overflow-y-auto", 
        "transition-transform",
        "transform",
        "bg-yellow-200", 
        "shadow-lg",
        "note",
        "hover:scale-105"
    );
    //create the delete button inside of the sticky note:
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add(
        "absolute", 
        "w-5", 
        "h-5", 
        "leading-5", 
        "text-center", 
        "transition-opacity", 
        "opacity-0", 
        "cursor-pointer", 
        "delete-btn", 
        "top-1", 
        "right-1", 
        "hover:opacity-100"
    ); 
    deleteBtn.textContent = "🗑";

    //append the delete button to the container
    noteItem.appendChild(deleteBtn)

    //now create the text for the sticky note
    const noteTextDiv = document.createElement("div");
    noteTextDiv.classList.add("p-4","note-text");

    //const formattedString = noteText.replace(/\n/g, '\n<br>');
    noteTextDiv.textContent = noteText;
    // <div class="p-4 note-text">Buy milk</div>
    /*
     // Create the div to display the note text (non-editable by default)
    const noteTextDiv = document.createElement("div");
    noteTextDiv.classList.add("p-4", "note-text");
    
    
    // Create the hidden textarea for editing
    const noteTextArea = document.createElement("textarea");
    noteTextArea.classList.add("absolute", "top-0", "left-0", "hidden", "w-full", "h-full", "p-4", "transition-transform", "transform", "bg-yellow-300", "shadow-xl", "resize-none", "outline-rose-700", "outline-offset-0", "note-edit", "note", "hover:scale-105");
    noteTextArea.value = noteText; // Initialize with the note's text

    // Append the div and textarea to the sticky note
    noteItem.appendChild(noteTextDiv);
    noteItem.appendChild(noteTextArea);

    */
    //make sure new lines are shown as new lines
    /*
    const noteTextArea = document.createElement("textarea");
    noteTextArea.classList.add("absolute" ,"top-0", "left-0", "hidden", "w-full", "h-full" ,"p-4", "transition-transform", "transform", "bg-yellow-300", "shadow-xl", "resize-none", "outline-rose-700", "outline-offset-0" ,"note-edit", "note", "hover:scale-105");
    const formattedString = noteText.replace(/\n/g, '\n<br>');
    noteTextArea.value = formattedString;
    console.log(noteText);
    noteTextDiv.innerHTML = noteTextArea.value;
    */
    const noteTextArea = document.createElement("textarea");
    noteTextArea.classList.add("absolute", "top-0", "left-0", "hidden", "w-full", "h-full", "p-4", "transition-transform", "transform", "bg-yellow-300", "shadow-xl", "resize-none", "outline-rose-700", "outline-offset-0", "note-edit", "note", "hover:scale-105");
    noteTextArea.value = noteText; // Initialize with the note's text
    
    // Save the updated text from the textarea to the div
     noteTextDiv.innerHTML = noteTextArea.value.replace(/\n/g, "<br>");

     // Update the notes array (assuming you have a global notes array)
     // Switch back to non-edit mode
     noteTextArea.classList.add("hidden");
     noteTextDiv.style.display = "block";
    //noteTextDiv.addEventListener('dblclick', handleEditNote);

    // Append the note text to the note container
    noteItem.appendChild(noteTextDiv);
    noteItem.appendChild(noteTextArea);

    // Append the sticky note to the notes wall
    const notesWall = document.getElementById("notes-wall");
    notesWall.appendChild(noteItem);
    notesWall.addEventListener("dblclick", function (event) {
        if (notes.length > event.target.id) {
            handleEditNoteMode(event.target);
            
        }
    });
    addSaveListenerToTextArea(noteItem);


    // Add an event listener to the delete button to handle note deletion
    deleteBtn.addEventListener('click', handleDeleteNote);
}

// Function to handle deleting a note
function handleDeleteNote(event) {
    const remove_id = event.srcElement.parentNode.id;
    
    //need to give the parent nodes id's that match the ones in the array so i can connect them. 
    
    // Remove the note from the notes array
    const noteIndex = notes.findIndex(note => Number(note.id) === Number(remove_id));
    if (noteIndex !== -1) {
       notes.splice(noteIndex, 1); // Remove the note from the array
    }
    render_notes();
    
}




function render_notes(){
    const noteListElement = document.getElementById("notes-wall");
    noteListElement.innerHTML = ""; // clear the current list

    // Loop through the filtered todos and add them to the DOM
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];

        createStickyNote(note.text, note.id)
    }
    
}

function handleNewNoteCreation(event) {
    console.log("here");
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent creating new lines in the textarea
        
        const newNoteInput = event.target;
        const noteText = newNoteInput.value.trim(); // Get the trimmed input value
        
        if (noteText !== "") {  // Only create a note if there's some content
            notes.push({ id: nextNoteId++, text: noteText });
            render_notes(); // Re-render notes
        }

        // Reset the textarea
        newNoteInput.value = ''; // Clear the input value

        // Set focus back to the textarea and reapply the placeholder behavior
        setTimeout(() => {
            newNoteInput.placeholder = "Create a new note..."; // Ensure placeholder is set
            newNoteInput.focus(); // Focus the textarea
        }, 0);
    }
}
/*

// Function to toggle the completed status of a todo
function handleEditNote(event) {
    let note = null;
    
    if (event.target.id !== null){//&& event.target.id.includes("todo-text")) {
      //todo = event.target;
      //console.log(event.target.parentNode.id);
      note = event.target;
    }
  
    let noteIdNumber = -1;
    if (note) {
      const noteId = event.target.id;
      todoIdNumber = Number(todoId);
    }
  
    render_notes();
  }
  */
 


function handleEditNoteMode(noteElement) {
    //first we need to check if we clicked on the text area or the div at the top:
    const hasId = noteElement.id ? true : false; 
        //this means we are in the div below the text. 
    if(hasId === true){
        active_note= noteElement;

    } else {
        active_note = noteElement.parentNode;
    }

    
   
    const noteTextDiv = active_note.querySelector('div');
    const noteTextArea = active_note.querySelector('textarea');
    // Hide the div that shows the text and display the textarea
    noteTextDiv.style.display = "none";
    noteTextArea.classList.remove("hidden");
    noteTextArea.focus();  // Focus on the textarea for immediate editing

    
    
   // console.log(noteElement.querySelector('div'));

    document.addEventListener("click", handleClickOutside);
}

function handleClickOutside(event){
    console.log(event.target);
    console.log(active_note)
    if (event.target !== active_note && !active_note.contains(event.target)) {
        saveNoteEdits();
    }
}

function handleSaveNote(event) {
    if ((event.key === "Enter" && !event.shiftKey) || event.key === "Escape") {
        event.preventDefault(); // Prevent any default actions like adding new lines
        saveNoteEdits(); // Call to save edits when Enter or Escape is pressed
    }
}

function saveNoteEdits() {
        
        
        const noteTextArea = active_note.querySelector(".note-edit");
        const noteElement = noteTextArea.parentElement;
        const noteTextDiv = active_note.querySelector(".note-text");

        // Save the updated text from the textarea to the div
        noteTextDiv.innerHTML = noteTextArea.value.replace(/\n/g, "<br>");

        // Update the notes array (assuming you have a global notes array)
        const noteId = Number(noteElement.id);
        const noteIndex = notes.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            notes[noteIndex].text = noteTextArea.value;
        }

        // Switch back to non-edit mode
        noteTextArea.classList.add("hidden");
        noteTextDiv.style.display = "block";
        document.removeEventListener("click", handleClickOutside);
   
        active_note=null;

}

function addSaveListenerToTextArea(noteElement) {
    const noteTextArea = noteElement.querySelector(".note-edit");
    noteTextArea.addEventListener("keydown", handleSaveNote);
    
}




/*
// Function to handle the editing of a note
function handleEditNote(event) {
    const noteDiv = event.target; // The note that was clicked
    const originalText = noteDiv.textContent; // Get the current text

    // Create the textarea for editing
    const textarea = document.createElement("textarea");
    textarea.classList.add("absolute", "top-0", "left-0", "w-full", "h-full", "p-4", "bg-yellow-300", "shadow-xl", "resize-none");
    textarea.style.outline = 'none'; // Remove the default focus outline

    textarea.value = originalText; // Set the current text
    noteDiv.parentNode.appendChild(textarea); // Append textarea to the note

    // Hide the original note text
    noteDiv.style.display = 'none';

    // Enlarge and shade the note
    noteDiv.parentNode.classList.add("scale-110", "bg-yellow-200"); // Apply scale and shade

    // Focus the textarea and set the cursor at the end
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    // Handle the keydown event for saving or adding a new line
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                // If Shift + Enter is pressed, allow new line in textarea
                // Prevent default to avoid any unintended behavior
                event.preventDefault();
                textarea.value += '\n'; // Add a new line in the textarea
                console.log(textarea.value);
            } else {
                // If just Enter is pressed, save changes and exit edit mode
                const newText = textarea.value; // Do not trim to preserve line breaks
                if (newText) {
                    const noteIndex = notes.findIndex(note => note.text === originalText);
                    if (noteIndex !== -1) {
                        notes[noteIndex].text = newText; // Update the note text with line breaks
                    }
                    render_notes(); // Re-render notes
                }
                noteDiv.style.display = 'block'; // Show the original note text again
                noteDiv.parentNode.classList.remove("scale-110", "bg-yellow-200"); // Reset the note size and color
                textarea.remove(); // Remove the textarea
            }
        }
    });

    // Handle the blur event to save changes when focus leaves the textarea
    textarea.addEventListener('blur', () => {
        const newText = textarea.value; // Keep the new text (with line breaks)
        
        if (newText) {
            const noteIndex = notes.findIndex(note => note.text === originalText);
            if (noteIndex !== -1) {
                notes[noteIndex].text = newText; // Update the note text

            }
            
            render_notes(); // Re-render notes
        }
        noteDiv.style.display = 'block'; // Show the original note text again
        noteDiv.parentNode.classList.remove("scale-110", "bg-yellow-200"); // Reset the note size and color
        textarea.remove(); // Remove the textarea
    });

    // Handle mouseleave to revert the note appearance
    noteDiv.parentNode.addEventListener('mouseleave', () => {
        if (textarea.parentNode) { // Check if textarea is still in the DOM
            noteDiv.parentNode.classList.add('border', 'border-red-500');
            noteDiv.parentNode.classList.remove("scale-110");
            noteDiv.parentNode.classList.add("bg-yellow-300", "scale-100"); // Return to normal size and shading
           // postItNote.classList.add('border', 'border-red-500');
        }
    });

    //need to add the conditional mouse hover to get rid of the frame again. 
    noteDiv.parentNode.addEventListener('mouseover', () => {
        if (textarea.parentNode) { // Check if textarea is still in the DOM
            noteDiv.parentNode.classList.remove('border', 'border-red-500');
           // Return to normal size and shading
           // postItNote.classList.add('border', 'border-red-500');
        }
    });

    // Prevent the textarea from being removed if clicked
    textarea.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

*/


    


// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', render_notes);

const note_element = document.getElementById('notes-wall');
//note_element.addEventListener('dblclick', handleEditNote);

//const existingNoteInput = document.getElementById()
const newNoteInput = document.getElementById('new-note');
newNoteInput.addEventListener('keydown', handleNewNoteCreation);
 