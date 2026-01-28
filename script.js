// Get reference to the To Do unordered list element
var toDo = document.getElementById("to-do");

// Set event handler on the Add Item button
document.getElementById("to-do__add").addEventListener("click", addItemButton);

// Get any checkboxes currently on list at start and assign event listeners
var checkboxes = document.getElementsByClassName("to-do__checkbox");
for (let checkbox of checkboxes) {
    checkbox.addEventListener("click", checkboxClicked);
}

// Get any cross elements on the to do items and assign event listener
var crosses = document.getElementsByClassName("to-do__cross");
for (let cross of crosses) {
    cross.addEventListener("click", deleteToDoItem);
}

function addItemButton() {
    let li = document.createElement("li");

    // Create and append the checkbox button and its img element inside it
    let checkboxButton = document.createElement("button");
    checkboxButton.classList = "to-do__checkbox";
    let img = document.createElement("img");
    img.src = "img/unchecked.jpg";
    img.alt = "Checkbox.";
    img.classList = "to-do__checkbox__img";
    img.setAttribute("role", "checkbox");
    img.setAttribute("aria-checked", "false");
    checkboxButton.appendChild(img);

    // Now append the checbox button to the li element
    li.appendChild(checkboxButton);

    // Create and append the input text element
    let input = document.createElement("input");
    input.type = "text";
    input.classList = "to-do__input";
    li.appendChild(input);

    // Create and append the cross element
    let crossButton = document.createElement("button");
    crossButton.classList = "to-do__cross";
    let crossImg = document.createElement("img");
    crossImg.src = "img/cross.jpg";
    crossImg.alt = "Delete to do item.";
    crossButton.appendChild(crossImg);
    li.appendChild(crossButton);
    
    toDo.appendChild(li);

    // Need to add event listeners to the checkbox and the cross element
    checkboxButton.addEventListener("click", checkboxClicked);
    crossButton.addEventListener("click", deleteToDoItem);
}

function checkboxClicked(event) {
    let checkboxImg = event.currentTarget.querySelector(".to-do__checkbox__img");
    let checked = checkboxImg.getAttribute("aria-checked");

    if (checked === "false") {
        checkboxImg.src = "img/checked.jpg";
        checkboxImg.setAttribute("aria-checked", "true");
    } else if (checked === "true") {
        checkboxImg.src = "img/unchecked.jpg";
        checkboxImg.setAttribute("aria-checked", "false");
    } else {
        console.log("Error handling checkbox image change.");
    }
}

function deleteToDoItem(event) {
    this.parentElement.remove();
}