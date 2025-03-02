document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const usernameDisplay = document.getElementById("usernameDisplay");
  const logoutBtn = document.getElementById("logout");

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (usernameDisplay) {
    usernameDisplay.innerHTML = `<strong>Welcome, ${user.name}!</strong>`;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }

  document.querySelectorAll(".view-product").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = this.dataset.id;
      window.location.href = `product-details.html?id=${productId}`;
    });
  });

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartIcon = document.querySelector("#cart-icon");

  if (cartIcon) {
    let cartCount = cartIcon.querySelector(".cart-count") || document.createElement("span");
    cartCount.classList.add("cart-count");
    cartIcon.appendChild(cartCount);

    function updateCartCount() {
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const { id, name, price, img } = this.dataset;
        const existingProduct = cart.find((item) => item.id === id);

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ id, name, price: parseFloat(price), img, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      });
    });

    cartIcon.addEventListener("click", function () {
      window.location.href = "cart.html";
    });

    updateCartCount();
  }

  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  function updateSliderPosition() {
    if (sliderWrapper) {
      sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSliderPosition();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSliderPosition();
    });
  }

  const backToHome = document.getElementById("backToHome");
  if (backToHome) {
    backToHome.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }

  const allProductsBtn = document.getElementById("all-products");
  const trendsBtn = document.getElementById("trends");
  const productBoxes = document.querySelectorAll(".product-container .box");

  if (allProductsBtn && trendsBtn) {
    allProductsBtn.addEventListener("click", () => {
      productBoxes.forEach((box) => (box.style.display = "block"));
    });

    trendsBtn.addEventListener("click", () => {
      productBoxes.forEach((box, index) => {
        box.style.display = index >= productBoxes.length - 4 ? "block" : "none";
      });
    });
  }
});

 
window.onscroll = function () {
  let footer = document.getElementById("footer");
  let backToHome = document.getElementById("backToHome");
  let footerPosition = footer.getBoundingClientRect().top;
  let windowHeight = window.innerHeight;

  if (footerPosition < windowHeight) {
    backToHome.style.display = "block";
  } else {
    backToHome.style.display = "none";
  }
};


function scrollToTop() {
   document.body.style.backgroundColor = "var(--main-color)"; 
  document.querySelectorAll("*").forEach((el) => {
    el.style.color = "var(--main-color)";
  });

  let backToHome = document.getElementById("backToHome");
  backToHome.style.backgroundColor = "var(--main-color)"; 
  backToHome.querySelector("i").style.color = "white";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}