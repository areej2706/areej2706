// --- 1. Global Component Core Injector ---
document.addEventListener("DOMContentLoaded", () => {
    // Inject Navigation Header Panel Node
    const headerTag = document.querySelector("header");
    if (headerTag) {
        fetch("header.html")
            .then(res => res.text())
            .then(htmlContent => {
                headerTag.innerHTML = htmlContent;
                applyActivePageHighlighter();
            });
    }

    // Inject Corporate Footer Grid Node
    const footerTag = document.querySelector("footer");
    if (footerTag) {
        fetch("footer.html")
            .then(res => res.text())
            .then(htmlContent => {
                footerTag.innerHTML = htmlContent;
            });
    }
});

// LocalStorage synchronized utility for seamless item saving
function toggleFavorite(element) {
    element.classList.toggle('active-fav');
}

function initializeCartItem(cardId) {
    const card = document.getElementById(cardId);
    const addBtn = card.querySelector('.btn-add-cart');
    const manager = card.querySelector('.quantity-manager');
    
    addBtn.style.display = 'none';
    manager.style.display = 'flex';

    // Extraction variables from markup properties
    const itemName = card.querySelector('h3').innerText;
    const itemPrice = parseInt(card.querySelector('strong').innerText.replace('Rs. ', ''));
    
    // Fallback handling regex pattern for matching inline styles backgrounds fluidly
    const bgImgUrl = card.querySelector('.card-image-panel').style.backgroundImage.slice(4, -1).replace(/"/g, "");

    let activeCart = JSON.parse(localStorage.getItem('aromaCart')) || [];
    
    // Check if item already managed in buffer
    let match = activeCart.find(product => product.id === cardId);
    if(!match) {
        activeCart.push({ id: cardId, name: itemName, price: itemPrice, img: bgImgUrl, qty: 1 });
    }
    
    localStorage.setItem('aromaCart', JSON.stringify(activeCart));
}

function modifyQty(cardId, delta) {
    const countSpan = document.getElementById('count-' + cardId);
    let currentQty = parseInt(countSpan.innerText);
    currentQty += delta;

    let activeCart = JSON.parse(localStorage.getItem('aromaCart')) || [];
    let productIndex = activeCart.findIndex(product => product.id === cardId);

    if (currentQty <= 0) {
        const card = document.getElementById(cardId);
        card.querySelector('.btn-add-cart').style.display = 'block';
        card.querySelector('.quantity-manager').style.display = 'none';
        countSpan.innerText = '1';

        if(productIndex > -1) activeCart.splice(productIndex, 1);
    } else {
        countSpan.innerText = currentQty;
        if(productIndex > -1) activeCart[productIndex].qty = currentQty;
    }

    localStorage.setItem('aromaCart', JSON.stringify(activeCart));
}

// Function jo navbar ke counter badge ko update karegi
function synchronizeHeaderCartBadge() {
    const badge = document.getElementById('global-cart-counter');
    if (!badge) return;
    
    let activeCart = JSON.parse(localStorage.getItem('aromaCart')) || [];
    // Total items quantity calculate karein
    let totalItems = activeCart.reduce((accumulator, item) => accumulator + item.qty, 0);
    
    badge.innerText = totalItems;
}

// Existing functions ke andar hook add karna ta ke badge real-time change ho
const originalInitializeCartItem = initializeCartItem;
initializeCartItem = function(cardId) {
    originalInitializeCartItem(cardId);
    synchronizeHeaderCartBadge();
};

const originalModifyQty = modifyQty;
modifyQty = function(cardId, delta) {
    originalModifyQty(cardId, delta);
    synchronizeHeaderCartBadge();
};

// Page load hote hi chalane ke liye
window.addEventListener('DOMContentLoaded', synchronizeHeaderCartBadge);

// Automatic URI Link Matcher Logic
function applyActivePageHighlighter() {
    const filename = window.location.pathname.split("/").pop();
    if (filename === "index.html" || filename === "") {
        document.getElementById("nav-home")?.classList.add("active");
    } else if (filename === "menu.html") {
        document.getElementById("nav-menu")?.classList.add("active");
    } else if (filename === "specials.html") {
        document.getElementById("nav-specials")?.classList.add("active");
    } else if (filename === "about.html") {
        document.getElementById("nav-about")?.classList.add("active");
    }
}

// --- 2. Live Registration Logic Engine ---
if (!localStorage.getItem('aroma_users')) {
    localStorage.setItem('aroma_users', JSON.stringify([]));
}

// Intercept form submittals dynamically
document.addEventListener('submit', (event) => {
    const targetFormId = event.target.id;

    if (targetFormId === 'signup-form') {
        event.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (pass !== confirm) {
            alert("❌ Operational Error: Passwords mismatch.");
            return;
        }

        let db = JSON.parse(localStorage.getItem('aroma_users')) || [];
        if (db.find(user => user.email === email)) {
            alert("⚠️ User record already present within the roastery database.");
            return;
        }

        db.push({ name, email, pass });
        localStorage.setItem('aroma_users', JSON.stringify(db));
        alert(`🎉 Registration safe for ${name}! Proceeding to secure gateway portal.`);
        window.location.href = 'login.html';
    }

    if (targetFormId === 'login-form') {
        event.preventDefault();
        const email = document.getElementById('log-email').value;
        const pass = document.getElementById('log-pass').value;

        const db = JSON.parse(localStorage.getItem('aroma_users')) || [];
        const identityMatch = db.find(user => user.email === email && user.pass === pass);

        if (identityMatch) {
            alert(`☕ Access Authorized. Welcome back to AromaBlend Executive Club, ${identityMatch.name}.`);
            window.location.href = 'index.html';
        } else {
            alert("❌ Gateway Verification Failed: Incorrect operational parameters.");
        }
    }
});