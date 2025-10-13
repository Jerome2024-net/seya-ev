// Smooth scroll functionality
function scrollToPreorder() {
    document.getElementById('precommande').scrollIntoView({ behavior: 'smooth' });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission
document.getElementById('preorderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        color: document.getElementById('color').value,
        newsletter: document.getElementById('newsletter').checked,
        terms: document.getElementById('terms').checked
    };
    
    // Save preorder data to localStorage
    localStorage.setItem('seyaPreorder', JSON.stringify(formData));
    console.log('Preorder data:', formData);
    
    try {
        // Send data to Formspree
        const response = await fetch('https://formspree.io/f/xovkpwdr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                color: formData.color,
                newsletter: formData.newsletter ? 'Yes' : 'No',
                terms: formData.terms ? 'Accepted' : 'Not accepted',
                message: `New SEYA pre-order from ${formData.firstName} ${formData.lastName} for a ${formData.color} vehicle.`
            })
        });
        
        if (response.ok) {
            console.log('Form data sent successfully to Formspree');
            // Redirect to Stripe payment after successful submission
            window.location.href = 'https://buy.stripe.com/8x2cN4a688sE2J29ew18c01';
        } else {
            console.error('Error sending form data');
            alert('There was an error processing your request. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your request. Please try again.');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-item, .spec-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.btn-menu');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.textContent = '☰';
        }
    });
    
    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.textContent = '☰';
        });
    });
}

// Gallery lightbox effect (optional)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add styles for lightbox
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 40px;
            color: white;
            cursor: pointer;
            font-weight: 300;
        `;
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Color selector preview (optional enhancement)
const colorSelect = document.getElementById('color');
if (colorSelect) {
    colorSelect.addEventListener('change', (e) => {
        const selectedColor = e.target.value;
        console.log('Selected color:', selectedColor);
        // You could add visual feedback here
    });
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation enhancement
const inputs = document.querySelectorAll('input[required], select[required]');
inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = '#ff4444';
    });
    
    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.style.borderColor = '#e0e0e0';
        }
    });
});

// Console welcome message
console.log('%c🚗 SEYA - The future of electric mobility', 'font-size: 20px; font-weight: bold; color: #3e6ae1;');
console.log('%cWelcome to our pre-order page!', 'font-size: 14px; color: #666;');

// Account Modal Functionality
const accountModal = document.getElementById('accountModal');
const accountBtn = document.querySelector('.btn-secondary');
const modalClose = document.querySelector('.modal-close');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Open modal when Account button is clicked
accountBtn.addEventListener('click', () => {
    accountModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal
function closeModal() {
    accountModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
accountModal.addEventListener('click', (e) => {
    if (e.target === accountModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && accountModal.classList.contains('active')) {
        closeModal();
    }
});

// Toggle between login and register forms
function toggleAuthForm() {
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    
    // Here you would typically send the data to your backend
    console.log('Login attempt:', email);
    
    // Show success message
    alert(`Welcome back! You are now signed in as ${email}`);
    
    // Close modal and reset form
    closeModal();
    e.target.reset();
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Registration data:', { name, email });
    
    // Show success message
    alert(`Account created successfully! Welcome ${name}! A confirmation email has been sent to ${email}.`);
    
    // Close modal and reset form
    closeModal();
    form.reset();
    
    // Switch back to login form
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}
