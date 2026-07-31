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
            guess1.textContent = guess;
            hint1.classList.remove("hint1");
            guess1.classList.remove("guess1");
            guesses -= 1;
            break;
        case 3:
            guess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
            guessed.push(guess);
            guess2.textContent = guess;
            hint2.classList.remove("hint2");
            guess2.classList.remove("guess2");
            guesses -= 1;
            break;
        case 2:
            guess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
            guessed.push(guess);
            guess3.textContent = guess;
            hint3.classList.remove("hint3");
            guess3.classList.remove("guess3");
            guesses -= 1;
            break;
        case 1:
            guess = input.elements.guessBox.value.charAt(0).toUpperCase() + input.elements.guessBox.value.slice(1);
            guessed.push(guess);
            guess4.textContent = guess;
            hint4.classList.remove("hint4");
            guess4.classList.remove("guess4");
            guesses -= 1;
            break;
        default:
            break;
    }
}
//~
function verify(array){
    const form = input.elements.guessBox.value;
    if(form.toLowerCase() == array.name.toLowerCase()){
        correct = true;
        winORlose.textContent = "WINNER IS YOU! "  + array.name;
        winORlose.classList.remove("winORlose");
        hide.classList.remove("hide");
        pkmnCard.removeAttribute('id');
        return -1;
    }else if(form.toLowerCase() != array.name.toLowerCase() && 0 < guesses){
        nextHint();
    }else{
        winORlose.textContent = "LOSER IS YOU! " + array.name;
        winORlose.classList.remove("winORlose");
        hide.classList.remove("hide");
        pkmnCard.removeAttribute('id');
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

    hint1.textContent = result;
    hint2.textContent = "Type(s): " + arrChall.types;
    hint3.textContent = "Stage:" + arrChall.stage;
    hint4.textContent = "Dex Number: " + arrChall.dexNumber;
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