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
        description: 'Nuestro yogurt base, cremoso y delicioso, elaborado con leche fresca y cultivos naturales. Perfecto para cualquier momento del día.',
        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
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
        description: 'Deliciosa combinación de nuestro yogurt natural con trozos reales de fresa fresca. Sin colorantes ni saborizantes artificiales.',
        image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
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
        name: 'Yogurt con Miel y Nueces',
        description: 'Una combinación perfecta de cremosidad y textura con miel natural de abeja y trozos de nueces crujientes.',
        image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Premium',
        nutrition: {
            calorias: '165',
            proteinas: '9g',
            grasas: '7g',
            carbohidratos: '18g'
        },
        sizes: [
            { name: '150ml', price: 5.00 },
            { name: '300ml', price: 8.50 },
            { name: '500ml', price: 13.00 }
        ]
    },
    {
        id: 4,
        name: 'Yogurt con Arándanos',
        description: 'Yogurt enriquecido con arándanos frescos, lleno de antioxidantes y con un sabor ligeramente ácido que lo hace irresistible.',
        image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Antioxidante',
        nutrition: {
            calorias: '140',
            proteinas: '8g',
            grasas: '4g',
            carbohidratos: '17g'
        },
        sizes: [
            { name: '150ml', price: 4.50 },
            { name: '300ml', price: 7.50 },
            { name: '500ml', price: 12.00 }
        ]
    },
    {
        id: 5,
        name: 'Yogurt Griego Natural',
        description: 'Extra cremoso y con mayor contenido de proteína. Ideal para deportistas y quienes buscan una opción más nutritiva.',
        image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Alto en Proteína',
        nutrition: {
            calorias: '100',
            proteinas: '15g',
            grasas: '3g',
            carbohidratos: '8g'
        },
        sizes: [
            { name: '150ml', price: 4.50 },
            { name: '300ml', price: 8.00 },
            { name: '500ml', price: 12.50 }
        ]
    },
    {
        id: 6,
        name: 'Yogurt con Granola',
        description: 'Yogurt natural acompañado de granola artesanal con avena, miel y frutos secos. Perfecto para un desayuno completo.',
        image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Desayuno',
        nutrition: {
            calorias: '190',
            proteinas: '10g',
            grasas: '8g',
            carbohidratos: '22g'
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