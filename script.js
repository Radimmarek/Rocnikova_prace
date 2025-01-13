const history = [];

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendCharacter(char) {
    document.getElementById('display').value += char;
}

function calculate() {
    try {
        let display = document.getElementById('display');
        const expression = display.value;
        const result = eval(expression);
        display.value = result;

        addToHistory(expression, result);
    } catch {
        alert("Neplatný výraz");
    }
}

function addToHistory(expression, result) {
    if (history.length >= 20) {
        history.shift();
    }
    history.push({ expression, result });
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.expression} = ${item.result}</span>
            <button onclick="removeFromHistory(${index})">Smazat</button>
        `;
        historyList.appendChild(li);
    });
}

function removeFromHistory(index) {
    history.splice(index, 1);
    renderHistory();
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

function updateTheme() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 8 && hour <= 20) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
}

function updateLibraryTheme() {
    const now = new Date();
    const hour = now.getHours();

    const historyElement = document.querySelector('.history');
    
    if (hour >= 8 && hour <= 20) {
        // Světlý motiv pro knihovnu
        historyElement.classList.remove('dark-theme');
        historyElement.classList.add('light-theme');
    } else {
        // Tmavý motiv pro knihovnu
        historyElement.classList.remove('light-theme');
        historyElement.classList.add('dark-theme');
    }
}

function updateThemeAndLibrary() {
    updateTheme();
    updateLibraryTheme();
}

setInterval(updateClock, 1000);
updateClock();
updateThemeAndLibrary();
setInterval(updateThemeAndLibrary, 60000);  // Aktualizace každou minutu
