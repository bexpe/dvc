const products = [
    { id: 1, name: "Floral Basic", price: 129, img: "https://picsum.photos/300?1" },
    { id: 2, name: "Bloom Hoodie", price: 149, img: "https://picsum.photos/300?2" },
    { id: 3, name: "Pastel Crewneck", price: 119, img: "https://picsum.photos/300?3" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer = document.getElementById("products");

function renderProducts() {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product">
                <img src="${product.img}">
                <h3>${product.name}</h3>
                <p>${product.price.toFixed(2)} zł</p>
                <button class="add-btn" onclick="addToCart(${product.id})">
                    Dodaj do koszyka
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
    }
    updateEverything();
}

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    updateEverything();
}

function clearCart() {
    cart = [];
    updateEverything();
}

function updateEverything() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    let totalBrutto = 0;

    cart.forEach(item => {
        totalBrutto += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} zł</p>
                <div class="quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    });

    const net = totalBrutto / 1.23;        // cena netto
    const vat = totalBrutto - net;          // VAT zawarte w cenie

    document.getElementById("subtotal").textContent = net.toFixed(2);
    document.getElementById("vat").textContent = vat.toFixed(2);
    document.getElementById("total").textContent = totalBrutto.toFixed(2);
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

function goToCheckout() {
    if (cart.length === 0) {
        alert("Koszyk jest pusty 🛒");
        return;
    }
    window.location.href = "checkout.html";
}

// start
renderProducts();
updateEverything();