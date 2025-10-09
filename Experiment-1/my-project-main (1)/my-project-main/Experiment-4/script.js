const textarea = document.getElementById('textInput');
const counter = document.getElementById('charCount');

textarea.addEventListener('input', () => {
  const length = textarea.value.length;
  counter.textContent = `Characters: ${length}`;
});
