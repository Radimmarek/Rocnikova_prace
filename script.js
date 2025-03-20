// Funkce pro přepínání mezi režimy kalkulačky
function switchMode() {
    let calculator = document.getElementById('calculator');
    let chemistryMode = document.getElementById('chemistryMode');
    let standardMode = document.getElementById('standardMode');
    
    // Přepnutí mezi standardním a chemickým režimem
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

// Obnovení režimu po reloadu stránky
window.onload = function() {
    let mode = localStorage.getItem('mode');
    if (mode === 'chemical') {
        switchMode();
    }
    showRealTime();
    changeBackgroundColor();
};

// Funkce pro přidání čísla nebo operátora do vstupu kalkulačky
function appendToInput(value) {
    document.getElementById('input').value += value;
}

// Funkce pro vymazání vstupu kalkulačky
function clearInput() {
    document.getElementById('input').value = '';
}

// Funkce pro výpočty ve standardní kalkulačce
function calculate() {
    let input = document.getElementById('input').value;
    try {
        let result = eval(input);
        document.getElementById('result').innerText = 'Výsledek: ' + result;
        addToHistory(input + ' = ' + result);
    } catch (e) {
        document.getElementById('result').innerText = 'Chyba ve výpočtu';
    }
}

// Funkce pro přidání výpočtu do historie
function addToHistory(entry) {
    let historyList = document.getElementById('historyList');
    let li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}

// Funkce pro výpočty v chemické kalkulačce
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

// Funkce pro změnu pozadí podle času
function changeBackgroundColor() {
    let hour = new Date().getHours();
    let calculator = document.getElementById('calculator');
    if (hour >= 6 && hour < 18) {
        calculator.style.backgroundColor = '#f4f4f4'; // Světlé pozadí
    } else {
        calculator.style.backgroundColor = '#333'; // Tmavé pozadí
        document.body.style.color = '#fff';
    }
}

// Funkce pro zobrazení aktuálního času
function showRealTime() {
    let timeElement = document.getElementById('realTime');
    setInterval(() => {
        let now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }, 1000);
}

// Zavolání funkce pro změnu pozadí každou minutu
setInterval(changeBackgroundColor, 60000);
changeBackgroundColor();
