const categories = ["all", "fruits", "vegetables", "drinks"];
const products = [
    { name:"Apple", category:"fruits"},
    { name:"Carrot", category:"vegetables"},
    { name:"Orange Juice", category:"drinks"},
    { name:"Banana", category:"fruits"},
    { name:"Broccoli", category:"vegetables"},
    { name:"Coffee", category:"drinks"}];
const categorySelect = document.getElementById("category");
const productList = document.getElementById("product-list");
function loadCategories() {
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); 
        categorySelect.appendChild(option);});}
function displayProducts(filterCategory) {
    productList.innerHTML = "";
    products.forEach(product => {
        if (filterCategory === "all" || product.category === filterCategory) {
            const div = document.createElement("div");
            div.classList.add("product");
            div.textContent = product.name;
            productList.appendChild(div); }});}
loadCategories();
displayProducts("all");
categorySelect.addEventListener("change", function () {
    displayProducts(this.value);});