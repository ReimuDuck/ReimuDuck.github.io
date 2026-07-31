
//~ REFACTOR THIS
const hint1 = document.querySelector(".hint1");
const hint2 = document.querySelector(".hint2");
const hint3 = document.querySelector(".hint3");
const hint4 = document.querySelector(".hint4");

const guess1 = document.querySelector(".guess1");
const guess2 = document.querySelector(".guess2");
const guess3 = document.querySelector(".guess3");
const guess4 = document.querySelector(".guess4");

const testPara = document.querySelector(".flavor");
const title = document.querySelector(".title");
const random = document.getElementById("random");
const input = document.getElementById("guess");

const winORlose = document.querySelector(".winORlose");
const hide = document.querySelector(".hide");
const pkmnCard = document.getElementById("pkmnCard");
const today = new Date();
guesses = 4;
guessed = [];
correct = false;