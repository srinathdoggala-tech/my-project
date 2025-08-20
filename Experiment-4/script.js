 const textarea = document.getElementById('textInput');
const counter = document.getElementById('charCount');

textarea.addEventListener('input', () => {
  counter.textContent = textarea.value.length;
});