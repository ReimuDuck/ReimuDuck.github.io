// test vars possibility to rework how this is done

// funcs with possibility to be moved to seperate file will be labelled with //~
async function fetchJSONData() {
  try {
    const response = await fetch('scripts//Data//CUBEOUTPUT.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();  
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}



//~ ALSO REFACTOR THIS
function nextHint(){
    switch(guesses){
        case 4:
            guess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
            guessed.push(guess);
            guessEls[0].textContent = guess;
            hints[0].classList.remove("hint1");
            guessEls[0].classList.remove("guess1");
            guesses -= 1;
            break;
        case 3:
            guess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
            guessed.push(guess);
            guessEls[1].textContent = guess;
            hints[1].classList.remove("hint2");
            guessEls[1].classList.remove("guess2");
            guesses -= 1;
            break;
        case 2:
            guess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
            guessed.push(guess);
            guessEls[2].textContent = guess;
            hints[2].classList.remove("hint3");
            guessEls[2].classList.remove("guess3");
            guesses -= 1;
            break;
        case 1:
            guess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
            guessed.push(guess);
            guessEls[3].textContent = guess;
            hints[3].classList.remove("hint4");
            guessEls[3].classList.remove("guess4");
            guesses -= 1;
            break;
        default:
            break;
    }
}
//~
function verify(array){
    const form = input.elements.guessBox.value;
    const currentGuess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
    if (guessed.includes(currentGuess)){
        return -1
    }
    if(form.toLowerCase() == array.name.toLowerCase()){
        highStreak += 1;
        winORlose.textContent = "WINNER IS YOU! "  + array.name;
        winORlose.classList.remove("winORlose");
        hide.classList.remove("hide");
        pkmnCard.removeAttribute('id');
        localStorage.setItem('streak', highStreak);
        return -1;
    }else if(form.toLowerCase() != array.name.toLowerCase() && 0 < guesses){
        nextHint();
    }else{
        highStreak = 0;
        winORlose.textContent = "LOSER IS YOU! " + array.name;
        winORlose.classList.remove("winORlose");
        hide.classList.remove("hide");
        pkmnCard.removeAttribute('id');
        localStorage.setItem('streak', highStreak);
    }
}


//~
function setChallHints(arrChall){
    abilityCheck = arrChall.anAbility != "None" ? ("An ability: " + arrChall.anAbility) : "None" 
    attackCheck = arrChall.anAttack != "None" ? ("An attack: " + arrChall.anAttack) : "None";
    result = "";
    if(abilityCheck == "None" && attackCheck == "None"){
        result = "HP: " + arrChall.hp;
    }else if(abilityCheck == "None"){
        result = "An attack: " + arrChall.anAttack;
    }else{
        result = "An ability: " + arrChall.anAbility;
    }
    streak.textContent = 'Streak: ' + localStorage.getItem('streak');
    hints[0].textContent = result;
    hints[1].textContent = "Type(s): " + arrChall.types;
    hints[2].textContent = "Stage:" + arrChall.stage;
    hints[3].textContent = "Dex Number: " + arrChall.dexNumber;
    console.log(arrChall.image);
    pkmnCard.src = arrChall.image;
    pkmnCard.alt = arrChall.name;
}
async function getRandomChall(){
    const challArray = await fetchJSONData();
    const challToGive =  Math.floor(Math.random() * challArray.length);
    console.log(challArray[challToGive]);
    return(challArray[challToGive]);
}



// Function to check if the user has completed the game today.
async function runDailyTask() {
    try {
        const challDone = false;
        const ranARR = await getRandomChall();
        const handler = () => {
            event.preventDefault();
            verify(ranARR);

            if (correct || guesses <= 0) {
                input.removeEventListener("input", handler);
            }
        };
        input.addEventListener("submit", handler);

        if (!ranARR) {
            console.error("Could not load JSON.");
            return;
        }
        testPara.textContent = ranARR.description;
        setChallHints(ranARR);
        if (challDone == false) {
            
            // localStorage.setItem('lastDailyRun', today);

        } else {

        }
    } catch (err) {
        console.error("Error running function: ", err);
    }
}

// Run on page load
runDailyTask();