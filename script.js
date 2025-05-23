// Funkce pro přepnutí mezi režimy
let isStandardMode = true;

function switchMode() {
    let calculator = document.getElementById('calculator');
    let chemistryMode = document.getElementById('chemistryMode');
    let standardMode = document.getElementById('standardMode');

    if (calculator.classList.contains('standard')) {
        calculator.classList.remove('standard');
        calculator.classList.add('chemical');
        chemistryMode.classList.remove('hidden');
        standardMode.classList.add('hidden');
        localStorage.setItem('mode', 'chemical');
    } else {
        calculator.classList.remove('chemical');
        calculator.classList.add('standard');
        chemistryMode.classList.add('hidden');
        standardMode.classList.remove('hidden');
        localStorage.setItem('mode', 'standard');
    }
}

// Funkce pro přidání hodnoty do vstupního pole
function appendToInput(value) {
    document.getElementById('input').value += value;
}

// Funkce pro vymazání vstupního pole
function clearInput() {
    document.getElementById('input').value = '';
}

// Funkce pro výpočet (standardní režim)
function calculate() {
    let input = document.getElementById('input');
    try {
        let result = eval(input.value);
        input.value = result;
        addToHistory(input.value);
    } catch (e) {
        input.value = 'Chyba';
    }
}

// Funkce pro přidání do historie
function addToHistory(entry) {
    let historyList = document.getElementById('historyList');
    let li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}

// Funkce pro výpočet x^n
function appendExponent() {
    let base = prompt("Zadejte základ (x):");
    let exponent = prompt("Zadejte exponent (n):");

    if (base !== null && exponent !== null) {
        let result = Math.pow(parseFloat(base), parseFloat(exponent));
        document.getElementById('input').value = result;
        addToHistory(`${base}ⁿ = ${result}`);
    }
}

// Funkce pro výpočet chemických výpočtů
function calculateChemical() {
    let molarMass = parseFloat(document.getElementById('molarMass').value);
    let amount = parseFloat(document.getElementById('amount').value);
    let concentration = parseFloat(document.getElementById('concentration').value);
    let volume = parseFloat(document.getElementById('volume').value);
    let chemicalResult = document.getElementById('chemicalResult');

    if (!isNaN(molarMass) && !isNaN(amount)) {
        let weight = molarMass * amount;
        chemicalResult.innerText = 'Hmotnost: ' + weight.toFixed(2) + ' g';
    } else if (!isNaN(concentration) && !isNaN(volume)) {
        let moles = concentration * volume;
        chemicalResult.innerText = 'Látkové množství: ' + moles.toFixed(2) + ' mol';
    } else if (!isNaN(concentration) && !isNaN(volume) && !isNaN(molarMass)) {
        let dilution = concentration * volume * molarMass;
        chemicalResult.innerText = 'Ředění: ' + dilution.toFixed(2) + ' g';
    } else {
        chemicalResult.innerText = 'Neplatné vstupy';
    }
}

// Funkce pro přepnutí motivu
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Funkce pro zobrazení aktuálního času
function showRealTime() {
    let timeElement = document.getElementById('realTime');
    setInterval(() => {
        let now = new Date();
        timeElement.textContent = now.toLocaleTimeString(); // Zobrazení času v reálném čase
    }, 1000); // Aktualizace každou sekundu
}

window.onload = function () {
    let mode = localStorage.getItem('mode');
    let theme = localStorage.getItem('theme');
    if (mode === 'chemical') {
        document.getElementById('calculator').classList.remove('standard');
        document.getElementById('calculator').classList.add('chemical');
        document.getElementById('chemistryMode').classList.remove('hidden');
        document.getElementById('standardMode').classList.add('hidden');
    }
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    showRealTime(); // Zavolání funkce pro reálný čas při načtení stránky
};
