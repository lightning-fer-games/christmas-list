const totalSlot = document.querySelector(".total-slot");
const listElement = document.querySelector(".list")

const formElement = document.querySelector("#list-form")
const nameElementField = document.querySelector("#field-name")
const priceElementField = document.querySelector("#field-price")
const descriptionElementField = document.querySelector("#field-description")

let list = []
const STORAGE_KEY = '__key-list__'

const prevList = localStorage.getItem(STORAGE_KEY)
if(prevList){
    list = JSON.parse(prevList)

    calculateTotal()
    createList()
}


// -------------- EVENT DINAMIC ----------------
formElement.addEventListener('submit', (event)=>{
    event.preventDefault()
// 1.    
    const name = nameElementField.value.trim();
    const price = priceElementField.value.trim();
    const description = descriptionElementField.value.trim();
// 2.
    addList(name, price, description)
// 3.
    formElement.reset();
// 4.
    nameElementField.focus()
})

// --------------- FUNCTIONS ---------------
function addList(name, price, description) {
// 1. make an object list
    const newList = {
        name,
        price: Number(price),
        description,
    };
// ! LOCAL STORAGE UPGRADE
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))

// 2. 
    list.push(newList);

// 3. calculate total function
    calculateTotal();

// 4. create element list
   createList()
}

function calculateTotal(){
    let total = 0;

    for (let index = 0; index < list.length; index++) {
        total += list[index].price
        // console.log(total, list);
    };
    
    totalSlot.innerText = formatAmount(total)
};

function formatAmount(amount){
    return '€' + amount.toFixed(2) 
};

// -----------------------------------------------------

function createList(){
    listElement.innerHTML = ''

    for (let index = 0; index < list.length; index++) {
        const elList = createElList(index) 
        listElement.innerHTML += elList
        console.log(list);
    }

    setDeleteItems()
}
function createElList(i){
    listValue = list[i]
    return `
    <li class="list-element">
        <div class="list-info">
        <h3>${listValue.name}</h3>
        <p>${listValue.description}</p>
        </div>
        <div class="list-price">${formatAmount(listValue.price)}</div>
        <button class="list-delete data-index="${i}"><i class="fas fa-trash-alt fa 4x"></i></button>
    </li>`
}

// -------- REMOVE ELEMENT from LIST ----------
function removeList(index){
    list.splice(index, 1)
    // ! LOCAL STORAGE UPGRADE
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))

    calculateTotal()
    createList()
}

// -----------------------------------------------------
function setDeleteItems(){
    const deleteButton = document.querySelectorAll(".list-delete");

    for (let index = 0; index < deleteButton.length; index++) {
        const button = deleteButton[index];
        button.addEventListener('click', function(){
            const index = button.dataset.index
            removeList(index)
        })
    }   
}
