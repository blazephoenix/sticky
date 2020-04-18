const notes = document.querySelector('#notes');
const editor = document.querySelector('#editor');
const idnewNote = document.querySelector('#newNote');
const iddeleteNote = document.querySelector("#deleteNote");


/**
 * Event Handlers
 */

idnewNote.addEventListener("click", ()=>{newNote()});
iddeleteNote.addEventListener("click", ()=>{deleteNote()});
notes.addEventListener("change", ()=>{changeNote()});
editor.addEventListener("keydown", ()=>{checkEmpty()});
editor.addEventListener("keyup", ()=>{saveNote()});

/**
 * Check if title is entered, if not call it untitled
 */
function checkEmpty() {
    if (notes.length === 0) {
        const untitled = document.createElement('option');
        untitled.innerText = 'Untitled';
        notes.appendChild(untitled);
    }
}

/**
 * Save entered info to storage as current note
 */
function saveNote() {
    window.localStorage.setItem(notes.value, editor.value);
}

// Load user's saved notes
for (let i = 0; i < window.localStorage.length; i++) {
    const newNote = document.createElement('option');
    newNote.innerText = window.localStorage.key(i);
    notes.appendChild(newNote);
}
changeNote();

/**
 * Change title to the currently selected note.
 */
function changeNote() {
    editor.value = window.localStorage.getItem(notes.value);
}

/**
 * Ask the user to name their new note then create it.
 * Add this note to the select div then focus to it.
 */
function newNote() {
    const note = prompt('Name of note?');
    window.localStorage.setItem(note, '');

    const noteElem = document.createElement('option');
    noteElem.innerText = note;
    notes.insertBefore(noteElem, notes.firstChild);

    // Focus this note
    notes.value = note;
    changeNote();
}

/**
 * Delete currently selected note
 */
function deleteNote() {
    const note = notes.value;
    window.localStorage.removeItem(note);
    editor.value = '';
    for (let i = 0; i < notes.length; i++) {
        const option = notes[i];
        if (option.value === note) {
            notes.removeChild(option);
        }
    }
}