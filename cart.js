// Shopping Cart functionality for Any Yogurt website

// --- Cart State & Persistence ---
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function getCart() {
    return JSON.parse(localStorage.getItem('anyYogurtCart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('anyYogurtCart', JSON.stringify(cart));
    updateCartDisplay();
    animateCartChange();
    trackCartEvent('cart_updated', { itemCount: cart.length, total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) });
}

let cartModal = null;

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    cartModal = document.getElementById('cart-modal');
    setupCartModal();
});

// Toggle cart modal
function toggleCart() {
    if (!cartModal) return;

    if (cartModal.classList.contains('active')) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderCartItemsWithRecommendations();
    }
}

// Setup cart modal event listeners
function setupCartModal() {
    if (!cartModal) return;

    // Close modal when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            toggleCart();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            toggleCart();
        }
    });
}

// Render cart items in modal
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = getCart();

    if (!cartItemsContainer || !cartTotal) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
                <p>¡Agrega algunos de nuestros deliciosos yogurts!</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-size">Tamaño: ${item.size}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(productId, size, newQuantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
    
    if (itemIndex === -1) return;

    // Add animation feedback
    const cartItem = document.querySelector(`[data-id="${productId}"][data-size="${size}"]`);
    if (cartItem) {
        cartItem.style.animation = 'none';
        cartItem.offsetHeight; // Trigger reflow
        cartItem.style.animation = 'pulse 0.3s ease';
    }

    if (newQuantity <= 0) {
        removeFromCart(productId, size);
        return;
    }

    cart[itemIndex].quantity = newQuantity;
    saveCart(cart);
    renderCartItemsWithRecommendations();
}

// Remove item from cart
function removeFromCart(productId, size) {
    // Add removal animation
    const cartItem = document.querySelector(`[data-id="${productId}"][data-size="${size}"]`);
    if (cartItem) {
        cartItem.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            const cart = getCart();
            const updatedCart = cart.filter(item => !(item.id === productId && item.size === size));
            saveCart(updatedCart);
            renderCartItemsWithRecommendations();
        }, 300);
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
        localStorage.removeItem('anyYogurtCart');
        updateCartDisplay();
        renderCartItemsWithRecommendations();
        showToast('Carrito vaciado', 'warning');
    }
}

// Proceed to checkout
function checkout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Tu carrito está vacío', 'warning');
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
    const total = subtotal + shipping;
    
    // Create checkout summary
    const checkoutSummary = cart.map(item => 
        `${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = `¡Hola! Me gustaría hacer un pedido:

${checkoutSummary}

Subtotal: $${subtotal.toFixed(2)}
Envío: $${shipping.toFixed(2)}
Total: $${total.toFixed(2)}

¡Gracias!`;

    const whatsappNumber = '584120720391';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Show checkout confirmation
    if (confirm(`Total del pedido: $${total.toFixed(2)}\n\n¿Proceder con el pedido por WhatsApp?`)) {
        window.open(whatsappUrl, '_blank');
        
        // Optional: Clear cart after successful order
        setTimeout(() => {
            if (confirm('¿Deseas vaciar el carrito después de realizar el pedido?')) {
                clearCart();
                toggleCart();
            }
        }, 1000);
    }
}

// Advanced cart features
function addToWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('anyYogurtWishlist') || '[]');
    
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('anyYogurtWishlist', JSON.stringify(wishlist));
        showToast('Producto agregado a tu lista de deseos', 'success');
    } else {
        showToast('Este producto ya está en tu lista de deseos', 'warning');
    }
}

function getRecommendedProducts(currentCart) {
    // Simple recommendation algorithm based on cart contents
    const cartProductIds = currentCart.map(item => item.id);
    const recommendations = productsData.filter(product => 
        !cartProductIds.includes(product.id)
    ).slice(0, 3);
    
    return recommendations;
}

function showRecommendations() {
    const cart = getCart();
    const recommendations = getRecommendedProducts(cart);
    
    if (recommendations.length === 0) return;

    const recommendationsHtml = `
        <div class="cart-recommendations">
            <h4>También te podría gustar:</h4>
            <div class="recommended-products">
                ${recommendations.map(product => `
                    <div class="recommended-item">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="recommended-info">
                            <span class="recommended-name">${product.name}</span>
                            <span class="recommended-price">Desde $${product.sizes[0].price.toFixed(2)}</span>
                        </div>
                        <button onclick="quickAddRecommended(${product.id})" class="quick-add">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer && cart.length > 0) {
        cartItemsContainer.insertAdjacentHTML('beforeend', recommendationsHtml);
    }
}

function quickAddRecommended(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const defaultSize = product.sizes[0];
    
    cart.push({
        id: productId,
        name: product.name,
        image: product.image,
        size: defaultSize.name,
        price: defaultSize.price,
        quantity: 1
    });

    saveCart(cart);
    renderCartItemsWithRecommendations();
    showToast(`${product.name} agregado al carrito`, 'success');
}

// Cart analytics and tracking
function trackCartEvent(eventName, data = {}) {
    // This would typically send data to analytics service
    console.log('Cart Event:', eventName, data);
    
    // Example: Track cart abandonment, product additions, etc.
    const cartEvents = JSON.parse(localStorage.getItem('anyYogurtCartEvents') || '[]');
    cartEvents.push({
        event: eventName,
        data: data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('anyYogurtCartEvents', JSON.stringify(cartEvents.slice(-50))); // Keep last 50 events
}

// Enhanced cart display with animations
function animateCartChange() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.animation = 'none';
        cartIcon.offsetHeight; // Trigger reflow
        cartIcon.style.animation = 'bounce 0.6s ease';
    }
}

// CSS animations for cart interactions
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    @keyframes slideOut {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(-100%); opacity: 0; }
    }

    .cart-recommendations {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e9ecef;
    }

    .cart-recommendations h4 {
        color: var(--primary-color);
        margin-bottom: 15px;
        font-size: 1rem;
    }

    .recommended-products {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .recommended-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: var(--light-gray);
        border-radius: 8px;
        transition: var(--transition);
    }

    .recommended-item:hover {
        background: rgba(224, 171, 83, 0.1);
    }

    .recommended-item img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 6px;
    }

    .recommended-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .recommended-name {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--dark-color);
    }

    .recommended-price {
        font-size: 0.75rem;
        color: var(--primary-color);
        font-weight: 600;
    }

    .quick-add {
        background: var(--primary-color);
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
    }

    .quick-add:hover {
        background: var(--accent-color);
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// Initialize cart with recommendations
function renderCartItemsWithRecommendations() {
    renderCartItems(); // Calls the original rendering function
    showRecommendations();
}

// Export functions for external use
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    checkout,
    getCart,
    addToWishlist
};