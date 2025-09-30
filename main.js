// Main JavaScript functionality for Any Yogurt website
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    loadProducts();
    setupContactForm();
    setupNewsletterForm();
    setupScrollAnimations();
    updateCartDisplay();
    updateFooterYear();
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Products data and loading
const productsData = [
    {
        id: 1,
        name: 'Yogurt Natural Clásico',
        description: 'Nuestro Yogurt Natural Clásico es la base de todo lo que hacemos. Es simple, pero extraordinario. Elaborado artesanalmente con leche fresca de la más alta calidad y cultivos naturales vivos, sin aditivos, conservantes ni azúcares añadidos.',
        image: 'imagen/Natural.png',
        badge: 'Más Popular',
        nutrition: {
            calorias: '120',
            proteinas: '8g',
            grasas: '4g',
            carbohidratos: '12g'
        },
        sizes: [
            { name: '150ml', price: 3.50 },
            { name: '300ml', price: 6.00 },
            { name: '500ml', price: 9.50 }
        ]
    },
    {
        id: 2,
        name: 'Yogurt con Fresa',
        description: 'Deliciosa combinación de nuestro yogurt base, cremoso y delicioso, con trozos reales de fresa fresca. Sin colorantes ni saborizantes artificiales. Es un placer refrescante que evoca la sensación de un postre casero. Perfecto para cualquier momento del día.',
        image: 'imagen/Fresa.png',
        badge: 'Frutal',
        nutrition: {
            calorias: '135',
            proteinas: '7g',
            grasas: '4g',
            carbohidratos: '16g'
        },
        sizes: [
            { name: '150ml', price: 4.00 },
            { name: '300ml', price: 7.00 },
            { name: '500ml', price: 11.00 }
        ]
    },
    {
        id: 3,
        name: 'Yogurt con Piña',
        description: 'Una explosión de frescura cítrica y dulce. Elaborado con nuestro yogurt natural y trozos de piña madura que aportan una textura jugosa y un sabor revitalizante. Ideal si buscas algo ligero, digestivo y con un toque exótico.',
        image: 'imagen/Piña.png',
        badge: 'Premium',
        nutrition: {
            calorias: '128',
            proteinas: '6g',
            grasas: '3g',
            carbohidratos: '17g'
        },
        sizes: [
            { name: '150ml', price: 5.00 },
            { name: '300ml', price: 8.50 },
            { name: '500ml', price: 13.00 }
        ]
    },
    {
        id: 4,
        name: 'Yogurt de Piña Coco',
        description: 'El paraíso tropical en un tazón. La acidez de la piña se fusiona perfectamente con la cremosidad y dulzura del coco. Un sabor rico y aromático, que evoca la playa, ideal para una experiencia indulgente y texturizada.',
        image: 'imagen/Coco piña.png',
        badge: 'Antioxidante',
        nutrition: {
            calorias: '145',
            proteinas: '6g',
            grasas: '5g',
            carbohidratos: '19g'
        },
        sizes: [
            { name: '150ml', price: 4.50 },
            { name: '300ml', price: 7.50 },
            { name: '500ml', price: 12.00 }
        ]
    },
    {
        id: 5,
        name: 'Yogurt con Durazno',
        description: 'Saborea la dulzura del verano. Este sabor es pura suavidad y aroma, con duraznos maduros que confieren una dulzura delicada y una textura carnosa. Una elección tierna, natural y versátil que agrada a todos.',
        image: 'imagen/Durazno.png',
        badge: 'Alto en Proteína',
        nutrition: {
            calorias: '130',
            proteinas: '7g',
            grasas: '3g',
            carbohidratos: '17g'
        },
        sizes: [
            { name: '150ml', price: 4.50 },
            { name: '300ml', price: 8.00 },
            { name: '500ml', price: 12.50 }
        ]
    },
    {
        id: 6,
        name: 'Yogurt de Oreo',
        description: 'El capricho que te mereces. Combinamos nuestro yogurt cremoso con trozos generosos de galletas Oreo. Es un sabor indulgente, crujiente y dulce, que convierte el yogurt en un postre instantáneo.',
        image: 'imagen/Oreo.png',
        badge: 'Desayuno',
        nutrition: {
            calorias: '115',
            proteinas: '4g',
            grasas: '3g',
            carbohidratos: '18g'
        },
        sizes: [
            { name: '200ml', price: 5.50 },
            { name: '350ml', price: 9.00 },
            { name: '500ml', price: 13.50 }
        ]
    }
];

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    productsData.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            
            <div class="product-nutrition">
                <h5>Información Nutricional (por porción):</h5>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <span>Calorías:</span>
                        <span>${product.nutrition.calorias}</span>
                    </div>
                    <div class="nutrition-item">
                        <span>Proteínas:</span>
                        <span>${product.nutrition.proteinas}</span>
                    </div>
                    <div class="nutrition-item">
                        <span>Grasas:</span>
                        <span>${product.nutrition.grasas}</span>
                    </div>
                    <div class="nutrition-item">
                        <span>Carbohidratos:</span>
                        <span>${product.nutrition.carbohidratos}</span>
                    </div>
                </div>
            </div>
            
            <div class="product-sizes">
                <h5>Tamaños disponibles:</h5>
                <div class="size-options" data-product-id="${product.id}">
                    ${product.sizes.map((size, index) => `
                        <div class="size-option ${index === 0 ? 'selected' : ''}" 
                             data-size="${size.name}" 
                             data-price="${size.price}">
                            ${size.name} - $${size.price.toFixed(2)}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="product-footer">
                <div class="product-price" id="price-${product.id}">$${product.sizes[0].price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `;

    // Setup size selection
    const sizeOptions = card.querySelectorAll('.size-option');
    const priceDisplay = card.querySelector(`#price-${product.id}`);

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            const price = parseFloat(option.dataset.price);
            priceDisplay.textContent = `$${price.toFixed(2)}`;
        });
    });

    return card;
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="loading-spinner"></div> Enviando...';

        setTimeout(() => {
            showToast('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 2000);
    });
}

// Newsletter form functionality
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = new FormData(newsletterForm).get('email');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="loading-spinner"></div>';

        setTimeout(() => {
            showToast('¡Te has suscrito exitosamente al newsletter!', 'success');
            newsletterForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .testimonial-item, .blog-post, .diff-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 4000);
}

// Cart functionality helper
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Update footer year
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Add product to cart
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const sizeOptions = document.querySelector(`[data-product-id="${productId}"]`);
    const selectedSize = sizeOptions.querySelector('.size-option.selected');
    
    if (!selectedSize) return;

    const cart = getCart();
    const existingItem = cart.find(item => 
        item.id === productId && item.size === selectedSize.dataset.size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            image: product.image,
            size: selectedSize.dataset.size,
            price: parseFloat(selectedSize.dataset.price),
            quantity: 1
        });
    }

    saveCart(cart);
    showToast(`${product.name} (${selectedSize.dataset.size}) agregado al carrito`, 'success');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    showToast('Ocurrió un error. Por favor, recarga la página.', 'error');
});

// Performance optimization - lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
        console.log('App loaded successfully');
    });
}