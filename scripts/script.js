let testPara = document.querySelector(".flavor");

async function fetchJSONData() {
  try {
    const response = await fetch('Data\\CUBEOUTPUT.json');
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
    const today = new Date();
    var firstDay = new Date(2026,6,29,0);
    // const arrayDates = [];
    for (let i = 0; i < challArray.length; i++) {
        if (today.toISOString().split('T')[0] == firstDay.toISOString().split('T')[0]){
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
// getDailyChallenge();
// Function to check if we need to run today's action
async function runDailyTask() {
    try {
        const challDone = false;
        const todaysArray = await getDailyChallenge();
        if (!todaysArray) {
            console.error("Could not load JSON.");
            return;
        }
        testPara.textContent = todaysArray.description;
        if (challDone == false) {
            

            // Save today's date so it won't run again until tomorrow
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
