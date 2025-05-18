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

function appendToInput(value) {
    document.getElementById('input').value += value;
}

function clearInput() {
    document.getElementById('input').value = '';
}

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

function addToHistory(entry) {
    let historyList = document.getElementById('historyList');
    let li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}

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

function changeBackgroundColor() {
    let hour = new Date().getHours();
    let calculator = document.getElementById('calculator');
    if (hour >= 6 && hour < 18) {
        calculator.style.backgroundColor = '#f4f4f4';
        document.body.style.color = '#000';
    } else {
        calculator.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    }
}

function showRealTime() {
    let timeElement = document.getElementById('realTime');
    setInterval(() => {
        let now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }, 1000);
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
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
    showRealTime();
    changeBackgroundColor();
};

setInterval(changeBackgroundColor, 60000);
