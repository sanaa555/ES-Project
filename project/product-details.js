

const products = [
    { id: 1, name: "T-shirt 14A", price: 50.05, img: "img/p1.jpg" },
    { id: 2, name: "T-shirt 14B", price: 45.00, img: "img/p2.jpg" },
    { id: 3, name: "T-shirt 14C", price: 55.00, img: "img/p3.jpg" },
    { id: 4, name: "T-shirt 14D", price: 60.05, img: "img/p4.jpg" },
    { id: 5, name: "T-shirt 14E", price: 66.00, img: "img/p5.jpg" },
    { id: 6, name: "T-shirt 14F", price: 70.00, img: "img/p6.jpg" },
    { id: 7, name: "T-shirt 14G", price: 80.05, img: "img/p7.jpg" },
    { id: 8, name: "T-shirt 14H", price: 57.00, img: "img/p8.jpg" },
    { id: 9, name: "T-shirt 14J", price: 44.00, img: "img/p4.jpg" }
];

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

const product = products.find(p => p.id === productId);

if (product) {
    document.getElementById("product-image").src = product.img;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
} else {
    document.querySelector(".product-details").innerHTML = "<h2>Product not found</h2>";
}

function addToCart() {
    let quantityInput = document.getElementById("quantity");
    let quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((total, item) => total + item.quantity, 0);

    let cartCount = document.getElementById("cart-count");
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", updateCartCount);














































