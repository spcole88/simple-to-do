// Appempt to get template url which will be passed by WP via wp_localize_script
const WP_BASE = (typeof toDoData !== "undefined" ? toDoData.templateUrl : "");

// Build helping function to use in setting img paths instead of IF statements every time
const getAssetPath = (path) => WP_BASE ? `${WP_BASE}/${path}` : path;

// Starting the to do app and getting reference to the UL element to run the startToDoApp() function
buildToDoContainer();
var toDo = document.getElementById("to-do");
startToDoApp();



function addItemOnEnter(event) {
    if (event.key == "Enter") {
        buildToDoItem();
        // Just in case, prevent any default usage
        event.preventDefault();
    }
}

function addItemButton() {
    let li = document.createElement("li");
    li.classList = "to-do__item";

    // Create and append the checkbox button and its img element inside it
    let checkboxButton = document.createElement("button");
    checkboxButton.classList = "to-do__checkbox";
    let img = document.createElement("img");
    img.src = getAssetPath("img/unchecked.jpg");
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
    crossImg.src = getAssetPath("img/cross.jpg");
    crossImg.alt = "Delete to do item.";
    crossButton.appendChild(crossImg);
    li.appendChild(crossButton);
    
    toDo.appendChild(li);

    // Need to add event listeners to the checkbox and the cross element
    // Also add event listener to the input to listen for enter presses
    checkboxButton.addEventListener("click", checkboxClicked);
    crossButton.addEventListener("click", deleteToDoItem);
    input.addEventListener("keydown", addItemOnEnter);
    input.addEventListener("input", storeItems);

    // Now we want to move focus to the new list item ready for typing.
    input.focus();

    // Run storeItems() to update our localStorage
    storeItems();
}

function checkboxClicked(event) {
    let checkboxImg = event.currentTarget.querySelector(".to-do__checkbox__img");
    let checked = checkboxImg.getAttribute("aria-checked");

    if (checked === "false") {
        checkboxImg.src = getAssetPath("img/checked.jpg");
        checkboxImg.setAttribute("aria-checked", "true");
    } else if (checked === "true") {
        checkboxImg.src = getAssetPath("img/unchecked.jpg");
        checkboxImg.setAttribute("aria-checked", "false");
    } else {
        console.log("Error handling checkbox image change.");
    }

    // Run storeItems() to update our localStorage
    storeItems();
}

function deleteToDoItem(event) {
    const item = event.currentTarget.parentElement;
    item.classList.add("remove-animation");
    item.addEventListener("transitionend", () => {
        item.remove();
        storeItems();
    });
}

function storeItems() {
    let currentItems = document.getElementsByClassName("to-do__item");
    let itemsToStore = [];

    // Build the array of items.
    for (let i = 0; i < currentItems.length; i++) {
        let item = currentItems[i];
        let itemChecked = item.querySelector(".to-do__checkbox__img").getAttribute("aria-checked");
        let itemText = item.querySelector(".to-do__input").value;
        let itemObject = {
            isChecked: itemChecked,
            text: itemText
        };
        itemsToStore.push(itemObject);
    }
    
    // Stringify the to do list and add it to local storage.
    localStorage.setItem("toDoList", JSON.stringify(itemsToStore));
}

function startToDoApp() {
    const savedItemsJson = localStorage.getItem("toDoList");

    if (savedItemsJson) {
        savedItems = JSON.parse(savedItemsJson);
        for (i = 0; i < savedItems.length; i++) {
            let isChecked = savedItems[i].isChecked;
            let text = savedItems[i].text;
            buildToDoItem(isChecked, text);
        }
    } else {
        buildToDoItem();
    }
}

function buildToDoContainer() {
    // This is the container element you put in HTML in which you want the to do app to be populated.
    var mainContainer = document.getElementById("to-do__main-container");

    var toDoContainer = document.createElement("div");
    toDoContainer.classList = "to-do__container";

    // Create the title and append it
    var toDoTitle = document.createElement("h2");
    toDoTitle.innerHTML = "To Do List";
    toDoContainer.appendChild(toDoTitle);

    // Create the UL element and append it
    var toDoUl = document.createElement("ul");
    toDoUl.classList = "to-do__list";
    toDoUl.id = "to-do";
    toDoContainer.appendChild(toDoUl);

    // Build the add item button and append it
    var toDoAddItemButton = document.createElement("button");
    toDoAddItemButton.classList = "to-do__add";
    toDoAddItemButton.id = "to-do__add";

    var toDoAddItemButtonImg = document.createElement("img");
    toDoAddItemButtonImg.alt = "Add item";
    toDoAddItemButtonImg.src = getAssetPath("img/plus.jpg");
    toDoAddItemButton.appendChild(toDoAddItemButtonImg);

    var toDoAddItemButtonText = document.createElement("p");
    toDoAddItemButtonText.innerHTML = "Add item";
    toDoAddItemButton.appendChild(toDoAddItemButtonText);

    toDoContainer.appendChild(toDoAddItemButton);

    // Finally append the created elements to the main container specified in the HTML
    mainContainer.appendChild(toDoContainer);

    // Add event listener to the Add Item button
    toDoAddItemButton.addEventListener("click", buildToDoItem);
}

function buildToDoItem(checked = "false", text = "") {
    let li = document.createElement("li");
    li.classList = "to-do__item";

    let itemContents = `
        <button class="to-do__checkbox">
            <img
                alt="Checkbox"
                class="to-do__checkbox__img"
                role="checkbox"
                aria-checked="${checked}"
                src="${checked === "true" ? getAssetPath("img/checked.jpg") : getAssetPath("img/unchecked.jpg")}">
        </button>
        <input
            type="text"
            class="to-do__input"
            value="${text}">
        <button class="to-do__cross">
            <img
                alt="Delete to do item"
                src="${getAssetPath("img/cross.jpg")}">
        </button>    
    `;

    li.innerHTML = itemContents;
    toDo.appendChild(li);

    // Now add the event listeners, move focus, and run storeItems()
    li.querySelector(".to-do__checkbox").addEventListener("click", checkboxClicked);
    li.querySelector(".to-do__cross").addEventListener("click", deleteToDoItem);
    const input = li.querySelector(".to-do__input");
    input.addEventListener("keydown", addItemOnEnter);
    input.addEventListener("input", storeItems);
    input.focus();
    storeItems();
}