const testPara = document.querySelector(".flavor");
const hint1 = document.querySelector(".hint1");
const hint2 = document.querySelector(".hint2");
const hint3 = document.querySelector(".hint3");
const hint4 = document.querySelector(".hint4");
const input = document.getElementById("guess");
const winORlose = document.querySelector(".winORlose");
guesses = 4;
correct = false;

async function fetchJSONData() {
  try {
    const response = await fetch('scripts/Data/CUBEOUTPUT.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();  
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}
// Function to get today's date in YYYY-MM-DD format
function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // e.g., "2026-07-29"
}
async function arrayStateCheck(){
    const challArray = await fetchJSONData();
    var firstDay = new Date(2026,6,29,0);
    // const arrayDates = [];
    for (let i = 0; i < challArray.length; i++) {
        if (getTodayString() == firstDay.toISOString().split('T')[0]){
            return i;
        }
        firstDay = new Date(firstDay.getTime());
        firstDay.setDate(firstDay.getDate() + 1);
        // arrayDates[i] = firstDay;
        
    }
    return -1;
}
// arrayStateCheck();
async function getDailyChallenge(){
    const challArray = await fetchJSONData();
    const challToGive = await arrayStateCheck();
    console.log(challArray[challToGive]);
    return(challArray[challToGive]);
}
function nextHint(){
    switch(guesses){
        case 4:
            hint1.classList.remove("hint1");
            guesses -= 1;
            break;
        case 3:
            hint2.classList.remove("hint2");
            guesses -= 1;
            break;
        case 2:
            hint3.classList.remove("hint3");
            guesses -= 1;
            break;
        case 1:
            hint4.classList.remove("hint4");
            guesses -= 1;
            break;
        default:
            break;
    }
}
function verify(array){
    const form = input.elements.guessBox.value;
    if(form.toLowerCase() == array.name.toLowerCase()){
        correct = true;
        winORlose.textContent = "WINNER IS YOU! " + array.name;
        winORlose.classList.remove("winORlose");
        return -1;
    }else if(form.toLowerCase() != array.name.toLowerCase() && 0 < guesses){
        nextHint();
    }else{
        winORlose.textContent = "LOSER IS YOU! " + array.name;
        winORlose.classList.remove("winORlose");
    }
}



function setChallHints(arrChall){
    hint1.textContent = "Type(s): " + arrChall.types;
    hint2.textContent = "Stage:" + arrChall.stage;
    hint3.textContent = "Dex Number: " + arrChall.dexNumber;
    hint4.textContent = "HP: " + arrChall.hp;
}



// getDailyChallenge();
// Function to check if we need to run today's action
async function runDailyTask() {
    try {
        const challDone = false;
        const todaysArray = await getDailyChallenge();
        const handler = () => {
            event.preventDefault();
            verify(todaysArray);

            if (correct || guesses <= 0) {
                input.removeEventListener("input", handler);
            }
        };
        input.addEventListener("submit", handler);

        if (!todaysArray) {
            console.error("Could not load JSON.");
            return;
        }
        testPara.textContent = todaysArray.description;
        setChallHints(todaysArray);
        if (challDone == false) {
            
            // localStorage.setItem('lastDailyRun', today);

        } else {
            
            console.log(challArray.length);
            console.log("Daily task already ran today.");
        }
    } catch (err) {
        console.error("Error running daily task:", err);
    }
}

// Run on page load
runDailyTask();
