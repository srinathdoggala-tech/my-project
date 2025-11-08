const select = document.getElementById("category");
const items = document.querySelectorAll("#products li");

function filterProducts() {
  const value = select.value;
  items.forEach(item => {
    if (value === "All" || item.dataset.category === value) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

select.addEventListener("change", filterProducts);
filterProducts();