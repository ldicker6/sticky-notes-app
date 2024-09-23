import "../style.css";



//function to create a new sticky note to the wall
function createStickyNote(noteText) {
    //create the container for the sticky note (the yellow box)
    const noteItem = document.createElement("div");
    //give it all of the same attributes as the starter code showed it to have

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
    noteTextDiv.classList.add("p-4");
    noteTextDiv.textContent = noteText;

    // Append the note text to the note container
    noteItem.appendChild(noteTextDiv);

    // Append the sticky note to the notes wall
    const notesWall = document.getElementById("notes-wall");
    notesWall.appendChild(noteItem);
}

//example to create a new sticky note
createStickyNote("Buy milk");
