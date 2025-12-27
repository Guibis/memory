// Login
const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

const inputValidate = ({ target }) => {
    if(target.value.length >= 1){
        button.removeAttribute("disabled");
        return
    }

    button.setAttribute("disabled", "");
};

const startLogin = () => {
    form.style.display = "flex";
    main.style.display = "none";
}

const startGame = (e) => {
    e.preventDefault();
    form.style.display = "none";
    main.style.display = "flex";
    startTimer();
    loadGame();
};

input.addEventListener("input", inputValidate);
form.addEventListener("submit", startGame);

// Main Game 
const memoryCards = document.querySelector(".memory-cards");
const main = document.querySelector("main");
const playerName = document.querySelector(".player");
const timer = document.querySelector(".timer");
const dialog = document.getElementById("dialog");
const closeDialog = document.getElementById("closeDialog");
const dialogP = document.getElementById("dialog-p");
let firstCard = "";
let secundCard = "";
let timerInterval;

const characters = [
    'zoro',
    'usopp',
    'sanji',
    'robin',
    'nami',
    'luffy',
    'frank',
    'chopper',
    'poster-zoro',
    'poster-usopp',
    'poster-sanji',
    'poster-robin',
    'poster-nami',
    'poster-luffy',
    'poster-frank',
    'poster-chopper'
]
console.log(playerName);
console.log(timer);

function showDialog(){
    dialogP.innerHTML = `${playerName.innerHTML}, you won the game in: ${timer.innerHTML}s`;
    dialog.show();
}

const startTimer = () => {
    timerInterval = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

function checkEndGame(){
    const disabledCards = document.querySelectorAll(".disabled-card");

    if(disabledCards.length == 16){

        showDialog();
        clearInterval(timerInterval);
        closeDialog.addEventListener("click", () => {
            dialog.close();
            window.location.reload()
        });
    }
}

function checkCards(){
    const firstCharacter = firstCard.getAttribute("data-character");
    const secundCharacter = secundCard.getAttribute("data-character");

    if("poster-"+firstCharacter == secundCharacter || "poster-"+secundCharacter == firstCharacter){
        setTimeout(() => {
            firstCard.firstChild.classList.add("disabled-card");
            secundCard.firstChild.classList.add("disabled-card");
            firstCard = "";
            secundCard = "";
            checkEndGame();
        }, 450);
    } else {
        setTimeout(() => {
        firstCard.classList.remove("turn-card");
        secundCard.classList.remove("turn-card");

        firstCard = "";
        secundCard = "";
        }, 500);
    }
} 

const turnCard = ({ target }) => {
    if(target.parentNode.className.includes("turn-card")){
        return;
    }

    if( firstCard == ""){
        target.parentNode.classList.add("turn-card");
        firstCard = target.parentNode;
    } else if(secundCard == ""){
        target.parentNode.classList.add("turn-card");
        secundCard = target.parentNode;
        checkCards();
    }

}

function createElement(tag,className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function createCard(character){
    const card = createElement("div","card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url('images/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", turnCard); 
    card.setAttribute("data-character", character);

    return card;
}

function loadGame(){
    playerName.innerHTML = input.value;
    const shuffle = characters.sort(() => Math.random() - 0.5);
    shuffle.forEach((character) => {
        const card = createCard(character);
        memoryCards.appendChild(card);
    });
}

startLogin();

