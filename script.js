let notes = JSON.parse(localStorage.getItem("notes")) || [];

function addNote() {

    let name = document.getElementById("studentName").value.trim();
    let text = document.getElementById("note").value.trim();

    if (name === "" || text === "") {
        alert("Please enter your name and note.");
        return;
    }

    let newNote = {
        id: Date.now(),
        name: name,
        text: text
    };

    notes.push(newNote);

    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("studentName").value = "";
    document.getElementById("note").value = "";

    displayNotes();
}


function displayNotes() {

    let notesList = document.getElementById("notesList");

    notesList.innerHTML = "";

    if (notes.length === 0) {

        let empty = document.createElement("div");

        empty.className = "empty-state";

        let icon = document.createElement("div");
        icon.className = "empty-icon";
        icon.innerText = "📝";

        let title = document.createElement("h3");
        title.innerText = "No notes yet";

        let message = document.createElement("p");
        message.innerText = "Create your first note to get started.";

        empty.appendChild(icon);
        empty.appendChild(title);
        empty.appendChild(message);

        notesList.appendChild(empty);

    } else {

        notes.forEach(function(note) {

            let card = document.createElement("div");
            card.className = "note-card";

            let title = document.createElement("h3");
            title.innerText = note.name;

            let paragraph = document.createElement("p");
            paragraph.innerText = note.text;

            let button = document.createElement("button");
            button.className = "remove-btn";
            button.innerText = "🗑 Remove";

            button.onclick = function() {
                removeNote(note.id);
            };

            card.appendChild(title);
            card.appendChild(paragraph);
            card.appendChild(button);

            notesList.appendChild(card);
        });
    }

    updateCount();
}


function removeNote(id) {

    notes = notes.filter(function(note) {
        return note.id !== id;
    });

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}


function updateCount() {

    let count = document.getElementById("noteCount");

    if (notes.length === 1) {
        count.innerText = "1 Note";
    } else {
        count.innerText = notes.length + " Notes";
    }
}


// Display saved notes when page loads
displayNotes();

