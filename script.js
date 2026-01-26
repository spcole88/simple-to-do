// Get reference to the To Do unordered list element
var toDo = document.getElementById("to-do");

// Set event handler on the Add Item button (just a div so probably should improve that at some point)
document.getElementById("to-do__add").addEventListener("click", addItemButton);

function addItemButton() {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = "img/unchecked.jpg";
    img.alt = "Checkbox.";
    img.classList = "to-do__checkbox";
    li.appendChild(img);
    
    toDo.appendChild(li);
}