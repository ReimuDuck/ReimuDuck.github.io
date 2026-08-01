// ---- state ----
let pkmns = [];
let guesses = 4;
let guessed = [];
let correct = false;
let highStreak = 0;
const today = new Date();

// ---- DOM refs ----
const datalist = document.getElementById('pkmns');

const hints = [1, 2, 3, 4].map(n => document.querySelector(`.hint${n}`));
const guessEls = [1, 2, 3, 4].map(n => document.querySelector(`.guess${n}`));

const testPara = document.querySelector(".flavor");
const title = document.querySelector(".title");
const random = document.getElementById("random");
const input = document.getElementById("guess");
const streak = document.querySelector(".streak");

const winORlose = document.querySelector(".winORlose");
const hide = document.querySelector(".hide");
const pkmnCard = document.getElementById("pkmnCard");

// ---- init ----
async function initPkmnList() {
    pkmns = await getList();

    const fragment = document.createDocumentFragment();
    pkmns.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        fragment.appendChild(option);
    });
    datalist.appendChild(fragment);
}

initPkmnList();