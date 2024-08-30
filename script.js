const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  notesContainer.appendChild(inputBox).appendChild(img); //p element will be added to the notes container and the image will be added to the p element.
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default Enter key action

    // Create a line break
    const br = document.createElement("br");

    // Get the current selection
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    // Get the current range (where the cursor is)
    const range = selection.getRangeAt(0);

    // Insert the line break at the cursor's position
    range.deleteContents(); // Remove any selected content
    range.insertNode(br); // Insert the line break

    // Move the cursor after the line break
    range.setStartAfter(br);
    range.collapse(true); // Collapse the range to a single point (after the line break)

    // Update the selection to the new range
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
