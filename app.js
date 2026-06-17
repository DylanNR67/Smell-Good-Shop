// ==================== PRODUCT DATABASE ====================
const products = [
    {
        id: "suits",
        name: "Suits Signature",
        tagline: "A Symphony of Scent",
        family: "Woody Spicy",
        price: 320,
        image: "assets/suits.png",
        description: "Indulge in a fragrance crafted to transcend time—a symphony of elegance, mystery, and allure, designed for those who seek beauty in every breath.",
        notes: {
            top: "Tobacco Leaf, Cardamom, Bergamot",
            heart: "Cacao Pod, Vanilla Orchid, Tonka Bean",
            base: "Dried Fruits, Sandalwood, Warm Amber"
        }
    },
    {
        id: "celestial",
        name: "Celestial Blossom",
        tagline: "A Dance of Petals",
        family: "Floral Romantic",
        price: 250,
        image: "assets/celestial_blossom.png",
        description: "A floral symphony of fresh rose petals, jasmine nectar, and soft white musk, evoking the timeless beauty of a spring garden.",
        notes: {
            top: "Bergamot, Lychee, Pear",
            heart: "Damask Rose, Incense, Vetiver",
            base: "Madagascar Vanilla, Ambergris, Musk"
        }
    },
    {
        id: "noir",
        name: "Noir Elixir",
        tagline: "An Irresistible Shadow",
        family: "Oriental Woody",
        price: 299,
        image: "assets/noir_elixir.png",
        description: "A rich, mysterious blend of warm amber, leather chords, and dark patchouli, designed for unforgettable evenings and deep mystique.",
        notes: {
            top: "Saffron, Nutmeg, Cinnamon",
            heart: "Oud Wood, Lavender, Cedar",
            base: "Patchouli, Musk, Rich Leather"
        }
    },
    {
        id: "mystic",
        name: "Mystic Dawn",
        tagline: "A Fresh Awakening",
        family: "Fresh Aquatic",
        price: 175,
        image: "assets/mystic_dawn.png",
        description: "A fresh morning breeze of marine accord, clean sea salt, and bright Italian mandarin notes, creating a crisp, vibrant, and energetic aura.",
        notes: {
            top: "Sea Salt, Italian Mandarin, Ozone",
            heart: "Grapefruit, Amberwood, Clary Sage",
            base: "Seawater, Musk, Red Clay"
        }
    }
];

// ==================== CUSTOMER REVIEWS DATABASE ====================
const reviews = [
    {
        name: "Sophia L.",
        title: "Certified Customer",
        rating: 5,
        text: "Great Service!! Noir Elixir is pure magic. The best seller line, it's perfect for evenings out, and I always receive compliments on it."
    },
    {
        name: "Marcus V.",
        title: "Verified Buyer",
        rating: 5,
        text: "Suits Signature is my everyday go-to. It has this incredible tobacco-amber warmth that lingers beautifully. Truly a masterpiece of elegance."
    },
    {
        name: "Elena R.",
        title: "Fragrance Lover",
        rating: 5,
        text: "So soft and romantic! Celestial Blossom smells like a luxurious garden of fresh roses after a gentle rain. I receive endless compliments."
    }
];

// ==================== STATE MANAGEMENT ====================
let cart = [];
let activeHeroIndex = 0;
let activeReviewIndex = 0;
let currentModalProduct = null;
let currentSelectedSize = 50; // default 50ml
let discountPercent = 0; // applied coupon percentage

// ==================== INITIALIZATION & LOAD ====================
document.addEventListener("DOMContentLoaded", () => {
    // Render Lucide icons
    lucide.createIcons();

    // Render Featured Collection
    renderCollection();

    // Initialize Hero Carousel
    updateHeroCarousel();

    // Initialize Reviews
    renderReview();
    renderReviewDots();

    // Setup Event Listeners
    setupEventListeners();
});

// ==================== RENDER FUNCTIONS ====================
function renderCollection() {
    const track = document.getElementById("collection-track");
    if (!track) return;

    // We filter suits out of featured carousel to showcase Celestial, Noir, Mystic as in screenshot
    const featured = products.filter(p => p.id !== 'suits');

    track.innerHTML = featured.map(p => `
        <div class="product-card">
            <div class="prod-img-box">
                <span class="prod-badge">Featured</span>
                <img src="${p.image}" alt="${p.name}" class="prod-img">
            </div>
            <div class="prod-info">
                <span class="prod-family">${p.family}</span>
                <h3 class="prod-name">${p.name}</h3>
                <p class="prod-desc">${p.description.substring(0, 95)}...</p>
                <div class="prod-footer">
                    <span class="prod-price">$${p.price}</span>
                    <button class="prod-cta" onclick="quickAddCart('${p.id}')">Shop Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderReview() {
    const rCard = document.getElementById("review-card");
    if (!rCard) return;

    const r = reviews[activeReviewIndex];

    // Trigger soft crossfade animations
    rCard.classList.add("transition-out");

    setTimeout(() => {
        // Generate Initials
        const initials = r.name.split(' ').map(n => n[0]).join('');

        rCard.querySelector(".avatar-fallback").innerText = initials;
        rCard.querySelector(".review-text").innerText = `"${r.text}"`;
        rCard.querySelector(".author-name").innerText = r.name;
        rCard.querySelector(".author-title").innerText = r.title;

        // Render stars
        const starsContainer = rCard.querySelector(".rating-stars");
        starsContainer.innerHTML = Array(r.rating).fill('<i data-lucide="star" class="star-filled"></i>').join('');
        lucide.createIcons({
            attrs: {
                class: ["star-filled"]
            }
        });

        rCard.classList.remove("transition-out");
        rCard.classList.add("transition-in");
        
        setTimeout(() => {
            rCard.classList.remove("transition-in");
        }, 50);
    }, 400);
}

function renderReviewDots() {
    const dotsContainer = document.getElementById("rev-dots");
    if (!dotsContainer) return;

    dotsContainer.innerHTML = reviews.map((_, idx) => `
        <span class="dot ${idx === activeReviewIndex ? 'active' : ''}" onclick="setReview(${idx})"></span>
    `).join('');
}

// ==================== CAROUSELS & NAVIGATION ====================
function updateHeroCarousel() {
    const heroDisplayImg = document.getElementById("hero-display-img");
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const dots = document.querySelectorAll(".slide-dots .dot");

    const currentSlide = products[activeHeroIndex];

    // Transition image & text
    if (heroDisplayImg) {
        heroDisplayImg.style.opacity = '0';
        heroDisplayImg.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            heroDisplayImg.src = currentSlide.image;
            heroDisplayImg.alt = currentSlide.name;
            heroDisplayImg.style.opacity = '1';
            heroDisplayImg.style.transform = 'scale(1)';
        }, 300);
    }

    if (heroTitle && heroSubtitle) {
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';

        setTimeout(() => {
            heroTitle.innerHTML = currentSlide.tagline.replace("of ", "of <br>");
            heroSubtitle.innerText = currentSlide.description;
            heroTitle.style.opacity = '1';
            heroSubtitle.style.opacity = '1';
        }, 300);
    }

    // Update dots
    dots.forEach((dot, idx) => {
        if (idx === activeHeroIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function setReview(index) {
    activeReviewIndex = index;
    renderReview();
    renderReviewDots();
}

// Scroll support helper
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==================== EVENT LISTENERS SETUP ====================
function setupEventListeners() {
    // --- Hero Nav ---
    document.getElementById("hero-prev").addEventListener("click", () => {
        activeHeroIndex = (activeHeroIndex - 1 + products.length) % products.length;
        updateHeroCarousel();
    });

    document.getElementById("hero-next").addEventListener("click", () => {
        activeHeroIndex = (activeHeroIndex + 1) % products.length;
        updateHeroCarousel();
    });

    document.querySelectorAll(".slide-dots .dot").forEach(dot => {
        dot.addEventListener("click", (e) => {
            activeHeroIndex = parseInt(e.target.dataset.index);
            updateHeroCarousel();
        });
    });

    document.getElementById("hero-details-btn").addEventListener("click", () => {
        openDetailsModal(products[activeHeroIndex].id);
    });

    // --- Featured Collection Carousel (Horizontal scrolling track) ---
    const colPrev = document.getElementById("col-prev");
    const colNext = document.getElementById("col-next");
    const colTrack = document.getElementById("collection-track");

    if (colPrev && colNext && colTrack) {
        colPrev.addEventListener("click", () => {
            colTrack.scrollBy({ left: -320, behavior: 'smooth' });
        });
        colNext.addEventListener("click", () => {
            colTrack.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // --- Reviews navigation ---
    document.getElementById("rev-prev").addEventListener("click", () => {
        activeReviewIndex = (activeReviewIndex - 1 + reviews.length) % reviews.length;
        renderReview();
        renderReviewDots();
    });

    document.getElementById("rev-next").addEventListener("click", () => {
        activeReviewIndex = (activeReviewIndex + 1) % reviews.length;
        renderReview();
        renderReviewDots();
    });

    // --- Header Navigation Active Class Toggles ---
    const navLinks = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
        let currentSec = "";
        const sections = document.querySelectorAll("section");
        const scrollPos = window.scrollY + 200;

        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop) {
                currentSec = sec.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSec) {
                link.classList.add("active");
            }
        });
    });

    // --- Search Bar Toggle ---
    const searchToggle = document.getElementById("search-toggle");
    const searchOverlay = document.getElementById("search-overlay");
    const closeSearch = document.getElementById("close-search");
    const searchInput = document.getElementById("search-input");

    searchToggle.addEventListener("click", () => {
        searchOverlay.classList.add("active");
        setTimeout(() => searchInput.focus(), 300);
    });

    closeSearch.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
    });

    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.toLowerCase().trim();
            if (query) {
                // Filter matching product
                const matched = products.find(p => p.name.toLowerCase().includes(query) || p.family.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
                if (matched) {
                    searchOverlay.classList.remove("active");
                    openDetailsModal(matched.id);
                } else {
                    alert(`No fragrance matching "${searchInput.value}" found.`);
                }
            }
        }
    });

    // --- Cart Toggle Drawer ---
    const cartToggle = document.getElementById("cart-toggle");
    const closeCart = document.getElementById("close-cart");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartBackdrop = document.getElementById("cart-backdrop");
    const cartShopNow = document.getElementById("cart-shop-now");

    const openCartDrawer = () => {
        cartDrawer.classList.add("active");
        cartBackdrop.classList.add("active");
    };

    const closeCartDrawer = () => {
        cartDrawer.classList.remove("active");
        cartBackdrop.classList.remove("active");
    };

    cartToggle.addEventListener("click", openCartDrawer);
    closeCart.addEventListener("click", closeCartDrawer);
    cartBackdrop.addEventListener("click", closeCartDrawer);
    if (cartShopNow) {
        cartShopNow.addEventListener("click", () => {
            closeCartDrawer();
            scrollToSection("collection");
        });
    }

    // --- Discount Badge Event ---
    document.getElementById("discount-badge").addEventListener("click", () => {
        document.getElementById("coupon-code").value = "ODORE30";
        applyDiscount();
        openCartDrawer();
    });

    // --- Apply Coupon ---
    document.getElementById("apply-coupon").addEventListener("click", applyDiscount);

    // --- Size Selector ---
    const sizeOpts = document.querySelectorAll(".size-opt");
    sizeOpts.forEach(btn => {
        btn.addEventListener("click", (e) => {
            sizeOpts.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentSelectedSize = parseInt(e.target.dataset.size);
            updateModalPrice();
        });
    });

    // --- Details Modal Add To Cart ---
    document.getElementById("modal-add-to-cart").addEventListener("click", () => {
        if (currentModalProduct) {
            addToCart(currentModalProduct.id, currentSelectedSize);
            closeDetailsModal();
            openCartDrawer();
        }
    });

    document.getElementById("close-details").addEventListener("click", closeDetailsModal);

    // --- Scent Quiz Modal ---
    const quizBtn = document.getElementById("quiz-btn");
    const quizModal = document.getElementById("quiz-modal");
    const closeQuiz = document.getElementById("close-quiz");
    const quizRestart = document.getElementById("quiz-restart");

    quizBtn.addEventListener("click", () => {
        quizModal.classList.add("active");
        setQuizStep(1);
    });

    closeQuiz.addEventListener("click", () => {
        quizModal.classList.remove("active");
    });

    quizRestart.addEventListener("click", () => {
        setQuizStep(1);
    });

    // Quiz options click handles
    let quizAnswers = {};
    const quizOpts = document.querySelectorAll(".quiz-opt");
    quizOpts.forEach(opt => {
        opt.addEventListener("click", (e) => {
            const step = parseInt(e.currentTarget.closest(".quiz-step").dataset.step);
            const ans = e.currentTarget.dataset.ans;
            quizAnswers[step] = ans;

            if (step < 3) {
                setQuizStep(step + 1);
            } else {
                calculateQuizResult(quizAnswers);
            }
        });
    });

    // Quiz Result Quick Actions
    document.getElementById("quiz-result-details").addEventListener("click", () => {
        const pId = document.getElementById("quiz-result-details").dataset.id;
        quizModal.classList.remove("active");
        openDetailsModal(pId);
    });

    document.getElementById("quiz-result-add").addEventListener("click", () => {
        const pId = document.getElementById("quiz-result-add").dataset.id;
        addToCart(pId, 50); // 50ml default
        quizModal.classList.remove("active");
        openCartDrawer();
    });

    // --- Checkout Simulator ---
    const checkoutModal = document.getElementById("checkout-modal");
    const closeCheckout = document.getElementById("close-checkout");
    const proceedCheckout = document.getElementById("proceed-checkout");
    const toPaymentBtn = document.getElementById("to-payment-btn");
    const backToShipBtn = document.getElementById("back-to-ship-btn");
    const checkoutForm = document.getElementById("checkout-form");
    const finishCheckout = document.getElementById("finish-checkout");

    proceedCheckout.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        closeCartDrawer();
        checkoutModal.classList.add("active");
        setCheckoutStep(1);
    });

    closeCheckout.addEventListener("click", () => {
        checkoutModal.classList.remove("active");
    });

    toPaymentBtn.addEventListener("click", () => {
        // Validate shipping form inputs manually
        const name = document.getElementById("ship-name").value.trim();
        const email = document.getElementById("ship-email").value.trim();
        const address = document.getElementById("ship-address").value.trim();
        const city = document.getElementById("ship-city").value.trim();
        const zip = document.getElementById("ship-zip").value.trim();

        if (!name || !email || !address || !city || !zip) {
            alert("Please fill in all shipping fields.");
            return;
        }

        setCheckoutStep(2);
    });

    backToShipBtn.addEventListener("click", () => {
        setCheckoutStep(1);
    });

    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Finalize purchase
        setCheckoutStep(3);
        
        // Trigger Confetti
        startConfetti();

        // Clear cart
        cart = [];
        updateCartUI();
    });

    finishCheckout.addEventListener("click", () => {
        checkoutModal.classList.remove("active");
        stopConfetti();
    });

    // --- Dynamic Payment Card Preview Listeners ---
    const ccNameInput = document.getElementById("cc-name");
    const ccNumInput = document.getElementById("cc-num");
    const ccExpiryInput = document.getElementById("cc-expiry");

    ccNameInput.addEventListener("input", (e) => {
        document.getElementById("cc-preview-name").innerText = e.target.value.toUpperCase() || "JOHN DOE";
    });

    ccNumInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = val.match(/\d{4,16}/g);
        let match = matches && matches[0] || '';
        let parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length > 0) {
            e.target.value = parts.join(' ');
        } else {
            e.target.value = val;
        }

        document.getElementById("cc-preview-number").innerText = e.target.value || "•••• •••• •••• ••••";
    });

    ccExpiryInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (val.length >= 2) {
            e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
        } else {
            e.target.value = val;
        }
        document.getElementById("cc-preview-expiry").innerText = e.target.value || "MM/YY";
    });
}

// ==================== DETAILS MODAL LOGIC ====================
function openDetailsModal(productId) {
    const modal = document.getElementById("details-modal");
    const p = products.find(prod => prod.id === productId);
    if (!p) return;

    currentModalProduct = p;
    currentSelectedSize = 50; // default size resets

    // Setup active sizes styles
    document.querySelectorAll(".size-opt").forEach(btn => {
        if (parseInt(btn.dataset.size) === 50) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Load information
    document.getElementById("modal-perfume-img").src = p.image;
    document.getElementById("modal-perfume-img").alt = p.name;
    document.getElementById("modal-perfume-family").innerText = p.family;
    document.getElementById("modal-perfume-name").innerText = p.name;
    document.getElementById("modal-perfume-desc").innerText = p.description;
    
    // Notes
    document.getElementById("modal-top-notes").innerText = p.notes.top;
    document.getElementById("modal-heart-notes").innerText = p.notes.heart;
    document.getElementById("modal-base-notes").innerText = p.notes.base;

    updateModalPrice();

    modal.classList.add("active");
}

function updateModalPrice() {
    if (!currentModalProduct) return;
    
    // 50ml base price, 100ml is 1.5x price
    let multiplier = currentSelectedSize === 100 ? 1.5 : 1;
    let finalPrice = Math.round(currentModalProduct.price * multiplier);
    
    document.getElementById("modal-perfume-price").innerText = `$${finalPrice}`;
}

function closeDetailsModal() {
    document.getElementById("details-modal").classList.remove("active");
    currentModalProduct = null;
}

// ==================== SCENT FINDER QUIZ MATCHING ====================
function setQuizStep(step) {
    const steps = document.querySelectorAll(".quiz-step");
    steps.forEach(s => {
        if (parseInt(s.dataset.step) === step || (step === 'result' && s.dataset.step === 'result')) {
            s.classList.add("active");
        } else {
            s.classList.remove("active");
        }
    });
}

function calculateQuizResult(answers) {
    // Decision logic
    let matchedId = "suits"; // default

    if (answers[1] === "fresh") {
        matchedId = "mystic";
    } else if (answers[1] === "sweet") {
        matchedId = "celestial";
    } else {
        // warm category
        matchedId = answers[2] === "night" ? "noir" : "suits";
    }

    const matchedProd = products.find(p => p.id === matchedId);
    
    // Load result
    document.getElementById("quiz-result-img").src = matchedProd.image;
    document.getElementById("quiz-result-img").alt = matchedProd.name;
    document.getElementById("quiz-result-name").innerText = matchedProd.name;
    document.getElementById("quiz-result-tag").innerText = matchedProd.family;
    document.getElementById("quiz-result-desc").innerText = matchedProd.description;

    // Attach actions dataset ids
    document.getElementById("quiz-result-details").dataset.id = matchedId;
    document.getElementById("quiz-result-add").dataset.id = matchedId;

    setQuizStep('result');
}

// ==================== SHOPPING CART FUNCTIONALITY ====================
function quickAddCart(productId) {
    addToCart(productId, 50); // Default to 50ml
    document.getElementById("cart-drawer").classList.add("active");
    document.getElementById("cart-backdrop").classList.add("active");
}

function addToCart(productId, size) {
    const p = products.find(prod => prod.id === productId);
    if (!p) return;

    // Calculate price based on size
    let price = size === 100 ? Math.round(p.price * 1.5) : p.price;

    // Check if item of same size exists in cart
    const existing = cart.find(item => item.id === productId && item.size === size);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: p.id,
            name: p.name,
            size: size,
            price: price,
            image: p.image,
            quantity: 1
        });
    }

    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items-container");
    const countBadge = document.querySelector(".cart-count");

    // Total counts
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countBadge.innerText = totalItems;
    
    // Scale bounce animation to cart badge
    countBadge.style.transform = "scale(1.3)";
    setTimeout(() => countBadge.style.transform = "scale(1)", 250);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty-state">
                <i data-lucide="shopping-bag" size="48"></i>
                <p>Your cart is empty.</p>
                <button class="btn btn-primary" onclick="scrollToSection('collection'); document.getElementById('cart-drawer').classList.remove('active'); document.getElementById('cart-backdrop').classList.remove('active');">Shop Collection</button>
            </div>
        `;
        lucide.createIcons();
        updatePriceSummary(0);
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-img-box">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <div class="cart-item-meta">${item.size} ml</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <div class="qty-btn-row">
                    <button class="qty-btn" onclick="adjustQty('${item.id}', ${item.size}, -1)">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="adjustQty('${item.id}', ${item.size}, 1)">+</button>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart('${item.id}', ${item.size})">Remove</button>
            </div>
        </div>
    `).join('');

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updatePriceSummary(subtotal);
}

function adjustQty(productId, size, amt) {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (!item) return;

    item.quantity += amt;
    if (item.quantity <= 0) {
        removeFromCart(productId, size);
    } else {
        updateCartUI();
    }
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    updateCartUI();
}

function applyDiscount() {
    const code = document.getElementById("coupon-code").value.trim().toUpperCase();
    const feedback = document.getElementById("coupon-feedback");
    
    if (code === "ODORE30") {
        discountPercent = 0.3;
        feedback.innerText = "Coupon applied! 30% OFF applied to items.";
        feedback.className = "coupon-feedback success";
    } else if (code === "") {
        discountPercent = 0;
        feedback.innerText = "";
    } else {
        discountPercent = 0;
        feedback.innerText = "Invalid coupon code.";
        feedback.className = "coupon-feedback error";
    }

    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updatePriceSummary(subtotal);
}

function updatePriceSummary(subtotal) {
    const subtotalEl = document.getElementById("cart-subtotal");
    const discountRow = document.getElementById("cart-discount-row");
    const discountValEl = document.getElementById("cart-discount-val");
    const totalEl = document.getElementById("cart-total");
    const chkTotalEl = document.getElementById("checkout-final-total");

    subtotalEl.innerText = `$${subtotal.toFixed(2)}`;

    let discountAmt = subtotal * discountPercent;
    let finalTotal = subtotal - discountAmt;

    if (discountPercent > 0 && subtotal > 0) {
        discountRow.style.display = "flex";
        discountValEl.innerText = `-$${discountAmt.toFixed(2)}`;
    } else {
        discountRow.style.display = "none";
    }

    totalEl.innerText = `$${finalTotal.toFixed(2)}`;
    if (chkTotalEl) {
        chkTotalEl.innerText = `$${finalTotal.toFixed(2)}`;
    }
}

// ==================== CHECKOUT STEPS LOGIC ====================
function setCheckoutStep(step) {
    const steps = document.querySelectorAll(".checkout-form-step");
    steps.forEach((s, idx) => {
        if (idx + 1 === step) {
            s.classList.add("active");
        } else {
            s.classList.remove("active");
        }
    });

    // Handle indicators active state
    document.getElementById("chk-ind-1").className = `checkout-step-indicator ${step >= 1 ? 'active' : ''}`;
    document.getElementById("chk-ind-2").className = `checkout-step-indicator ${step >= 2 ? 'active' : ''}`;
    document.getElementById("chk-ind-3").className = `checkout-step-indicator ${step >= 3 ? 'active' : ''}`;

    if (step === 3) {
        // Set mock order id
        document.getElementById("success-order-id").innerText = Math.floor(10000 + Math.random() * 90000);
        
        // Hide details & payment, only close modal btn visible
        document.getElementById("close-checkout").style.display = "none";
    } else {
        document.getElementById("close-checkout").style.display = "flex";
    }
}

// ==================== CANVAS CONFETTI EFFECT ====================
let canvas = null;
let ctx = null;
let confettiActive = false;
let confettiParticles = [];
const confettiColors = ['#DDA15E', '#C5A880', '#EADFD0', '#1A1A1A', '#FAF8F5'];

function startConfetti() {
    canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    canvas.style.display = "block";
    confettiActive = true;
    confettiParticles = [];

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Seed particles
    for (let i = 0; i < 120; i++) {
        confettiParticles.push(createConfettiParticle());
    }

    requestAnimationFrame(updateConfetti);
}

function stopConfetti() {
    confettiActive = false;
    if (canvas) {
        canvas.style.display = "none";
    }
    window.removeEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

function createConfettiParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height - 20,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        speed: Math.random() * 3 + 2
    };
}

function updateConfetti() {
    if (!confettiActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speed;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        // Draw particle
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        // If particle goes off screen
        if (p.y > canvas.height) {
            confettiParticles[idx] = createConfettiParticle();
            confettiParticles[idx].y = -20;
        }
    });

    requestAnimationFrame(updateConfetti);
}
