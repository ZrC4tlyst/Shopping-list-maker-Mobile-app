import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: "https://playground-9782b-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shopping-list");

const addToCartEl = document.getElementById("add-button");
const groceryTextBoxEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");


addToCartEl.addEventListener("click", () => {
    let textBoxValue = groceryTextBoxEl.value;
    push(shoppingListInDB, textBoxValue);
    clearInputFieldEl();
});

function clearInputFieldEl() {
    groceryTextBoxEl.value = "";
}

function renderShoppingList(item) {
    shoppingListEl.innerHTML += `
    <li>${item}</li>
    `;
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

onValue(shoppingListInDB, function (snapshot) {
    let ShoppingListArray = Object.values(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < ShoppingListArray.length; i++) {
        let shoppingList = ShoppingListArray[i];
        renderShoppingList(shoppingList);
    }
});