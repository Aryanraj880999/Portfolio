// Smooth scrolling for navigation links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
        }
    });
}, observerOptions);

// Initialize animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.skill-card, .project-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Button animation
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            submitBtn.textContent = 'Message Sent!';
            submitBtn.classList.remove('from-blue-500', 'to-purple-600');
            submitBtn.classList.add('from-green-500', 'to-green-600');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('from-green-500', 'to-green-600');
                submitBtn.classList.add('from-blue-500', 'to-purple-600');
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
    
    // Parallax effect for floating gradients
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animate-float');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Mouse tracking for glass elements
    document.addEventListener('mousemove', (e) => {
        const cursor = { x: e.clientX, y: e.clientY };
        const glassElements = document.querySelectorAll('.glass');
        
        glassElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const x = cursor.x - rect.left;
            const y = cursor.y - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const intensity = Math.min(1, Math.sqrt(x * x + y * y) / 200);
                element.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,${0.3 - intensity * 0.1}), rgba(255,255,255,0.1))`;
            }
        });
    });
    
    // Skill progress bar animations
    const skillBars = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('[style*="width"]');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transition = 'width 1s ease-out';
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-600');
            }
        });
    });
});