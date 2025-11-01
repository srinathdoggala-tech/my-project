const textArea = document.getElementById('text-area');
const charVar = document.getElementById('char-var');
const remChar = document.getElementById('remaining-chars');

let fxn = textArea.addEventListener("input", () => {
    const cnt = textArea.value.length; 
    const maxi = textArea.maxLength = 200;
    charVar.innerText = `${cnt}`; 
    remChar.textContent = maxi - cnt;
});