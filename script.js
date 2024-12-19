
//On récupère le bouton dans le HTML
const button = document.getElementById("button-ok");

//On définit les tableaux
let wellPlaced = [];
let notInWord = [];
let missPlaced = [];

const wordTry = document.getElementById("try");
const wordWell = document.getElementById("well");
const wordMiss = document.getElementById("miss");
const wordNot = document.getElementById("not");
const wordWin = document.getElementById("win");
const wordInput = document.getElementById("word");

function tryWord(word, base) {
  // On réinitialise les tableaux
  let wellPlaced = [];
  let missPlaced = [];
  let notInWord = [];

  //jeu sensible à la casse
  word = word.toLowerCase();
base = base.toLowerCase();

  let arrayWord = word.split("");
  let arrayBase = base.split("");

  arrayWord.forEach((letter, index) => {
    if (letter === arrayBase[index]) {
      wellPlaced.push(letter);
    } else if (arrayBase.includes(letter)) {
      missPlaced.push(letter);
    } else {
      notInWord.push(letter);
    }
  });

  return {
    wellPlaced: wellPlaced,
    missPlaced: missPlaced,
    notInWord: notInWord,
  };
}


// Affiche le message de victoire
function showMessage() {
  document.getElementById("win").style.display = "block";
}

// Cache le message de victoire
function dontShowMessage() {
  document.getElementById("win").style.display = "none";
}

// Vérifie si l'utilisateur a gagné
function winMotus(word, base) {
  if (word === base) {
    document.getElementById("win").innerText = "Vous avez gagné !";
    showMessage();
  } else {
    dontShowMessage();
  }
}

//fonction qui permet à l'utilisateur de tester si son mot est valide ou pas
function guess() {
  const base = "dictionnaire";
  const wordInput = document.getElementById("word");
  const word = wordInput.value;

  const result = tryWord(word, base);

 wordTry.innerText = `Mot tenté : ${word}`;
wordWell.innerText = result.wellPlaced.length > 0 ? `Bien placé : ${result.wellPlaced.join(", ")}` : "";
wordMiss.innerText = result.missPlaced.length > 0 ? `Mal placé : ${result.missPlaced.join(", ")}` : "";
wordNot.innerText = result.notInWord.length > 0 ? `Pas dans le mot : ${result.notInWord.join(", ")}` : "";

document.getElementById("word").value = "";

  winMotus(word, base);
}

// Initialiser les éléments affichés correctement dès le début
dontShowMessage();

// Ajouter l'événement sur le bouton
button.addEventListener("click", guess);

