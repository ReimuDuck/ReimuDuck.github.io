async function loadTextFile() {
    try {
        const response = await fetch('scripts//Data//Name.txt');
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching the file:', error);
    }
}

async function getList(){
    const file = await loadTextFile();
    const pkmnNames = file.split("\n").map(name => name.trim()).filter(Boolean);
    return pkmnNames;
}


