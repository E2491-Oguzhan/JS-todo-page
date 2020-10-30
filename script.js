// * UI variables

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

// * load items
loadItems();

// * call event listener
eventListeners();

function eventListeners() {
  // * submit event
  form.addEventListener("submit", addNewItem);

  // * delete an item
  taskList.addEventListener("click", deleteItem);

  // * delete all items

  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLocalstorage();
  items.forEach(function (item) {
    createItem(item);
  });
}

// * get items from local storage
function getItemsFromLocalstorage() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    // * JSON formata dönüştürme
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// * set item to local storage
function setItemToLocalstorage(text) {
  items = getItemsFromLocalstorage();
  items.push(text);
  // * köşeli parentez içinde string ifade haine getirir virgülle ayrılır
  localStorage.setItem("items", JSON.stringify(items));
}

// * delete item from LS
function deleteItemFromLocalstorage(text) {
  items = getItemsFromLocalstorage();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem("items", JSON.stringify(items));
}

//* create an item
function createItem(text) {
  // * create li
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  // * create a
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  // * add a to li
  li.appendChild(a);

  // * add li to ul
  taskList.appendChild(li);
}

// * add new item
function addNewItem(e) {
  if (input.value === "") {
    alert("add a task which has to be at least 1 characters");
    e.remove();
  }

  // * create an item
  createItem(input.value);

  // * save to local storage
  setItemToLocalstorage(input.value);

  // * clear input
  input.value = "";

  e.preventDefault();
}

// * delete an item
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();

    // * delete item from LS
    deleteItemFromLocalstorage(
      e.target.parentElement.parentElement.textContent
    ); // * li elemanının içindeki text'e ulaşdık.
  }
  e.preventDefault();
}

// * delete all items
function deleteAllItems(e) {
  if (confirm("Are you sure to delete all your tasks ?")) {
    // * taskList.innerHTML = "" ;
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}
