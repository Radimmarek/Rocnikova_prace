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
        display.value = eval(display.value);
    } catch {
        alert("Neplatný výraz");
    }
}
