document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".cart-items");
    const totalElement = document.querySelector("#total-price");

    function renderCart() {
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
            totalElement.textContent = "Total: $0.00";
            return;
        }

        cart.forEach((item, index) => {
            let itemPrice = parseFloat(item.price);
            let itemTotal = itemPrice * item.quantity;
            totalPrice += itemTotal;

            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.img}" class="product-image">
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${itemPrice.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="remove" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    document.getElementById("buy-now").addEventListener("click", function () {
        let confirmation = confirm("Are you sure you want to complete your order?");
        if (confirmation) {
            alert("🚚 Order Shipped!");
            localStorage.removeItem("cart");
            renderCart();
            window.location.href = "index.html";
        }
    });

    renderCart();
});
