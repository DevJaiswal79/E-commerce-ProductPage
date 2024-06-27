// Mobile Menu
const mobileMenuBtn = document.querySelector(".menu-icon");
const mobileMenu = document.querySelector(".header__menu--list");
const darkBackground = document.querySelector(".dark-background");

mobileMenuBtn.onclick = () => {
    darkBackground.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    mobileMenu.classList.contains("active")
        ? mobileMenuBtn.src = "./images/icon-close.svg"
        : mobileMenuBtn.src = "./images/icon-menu.svg";
}



const input = document.querySelector(".order__quantity--input");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");

minusBtn.onclick = () => (input.value > 0) ?input.value-- :input.value;
plusBtn.onclick = () => input.value++;


// Add to cart & Remove from cart
const cartBtn = document.querySelector(".header__cart-icon");
const cart = document.querySelector(".cart");
const cartQuantityBubble = document.querySelector(".cart-icon--quantity");
const addToCartBtn = document.querySelector(".order__cart");
const cartContainer = document.querySelector(".cart-content");
const productElement = document.createElement("div");
const removeFromCartBtn = document.createElement("button");

cartBtn.onclick = () => cart.classList.toggle("active");

productElement.classList.add("cart__product");
removeFromCartBtn.classList.add(".cart__product--delete");
removeFromCartBtn.innerHTML = `<img src="./images/icon-delete.svg" alt="">`;

let product = {
    name: "Fall Limited Edition Sneakers",
    price : 4999,
    quantity: sessionStorage.getItem("quantity") || 0,
};


const updateCart = () => {
    cartContainer.classList.remove("empty");
    cartQuantityBubble.classList.remove("empty");
    cartQuantityBubble.innerText = product.quantity;

    let total = product.price * product.quantity;

    let htmlCode = 
        `<img class="cart__product--img" src="./images/image-product-1-thumbnail.jpg" alt="">

        <div class="cart__product--info">
            <p class="cart__info--title">${product.name}</p>
            <span class="cart__info--quantity">$${product.price} x ${product.quantity}</span>
            <b class="cart__info--price">$${total}.00 </b>
        </div>`;

    productElement.innerHTML = htmlCode;
    productElement.appendChild(removeFromCartBtn);
    cartContainer.appendChild(productElement);
}

const addToCart = () => {
    if (input.value <= 0 || input.value == undefined || null) {
            alert("error");
            return;
    }
    
    cart.classList.add("active");
    cartContainer.classList.remove("empty");
    
    product.quantity = parseInt(product.quantity) + parseInt(input.value);

    updateCart();
    sessionStorage.setItem("quantity", product.quantity);
};

const removeFromCart = () => {
    if (!cartContainer.classList.contains("empty")) {
        cartContainer.removeChild(productElement);
        cartContainer.classList.add("empty");
        cartQuantityBubble.innerText = "";
        product.quantity = 0;
        sessionStorage.setItem("quantity", product.quantity);
    }
};

addToCartBtn.onclick = () => addToCart();
removeFromCartBtn.onclick = () => removeFromCart();

if (sessionStorage.getItem("quantity") >= 1) {
    updateCart();
}