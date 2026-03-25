// Prevent browser from restoring previous scroll position on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Always start at top on page load/reload
window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Landing Page Initial State ---
    document.body.style.overflow = "hidden";
    const navbar = document.querySelector("nav");
    if (navbar) {
        navbar.style.display = "none";
    }

    const exploreBtn = document.getElementById("exploreBtn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", function () {
            // Enable scrolling
            document.body.style.overflow = "auto";

            // Show navbar
            if (navbar) {
                navbar.style.display = "flex";
            }

            // Smoothly scroll to About section
            const aboutSection = document.querySelector("#about");
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }

    // --- 2. Dynamic Typing Effect for Hero Section ---
    const texts = ["Full-Stack Developer", "Software Engineer", "Tech Enthusiast", "Problem Solver"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let isDeleting = false;
    const typeElement = document.querySelector('.typing-text');
    
    if (typeElement) {
        // Enforce fresh start on reload
        typeElement.textContent = "";
        count = 0;
        index = 0;
        isDeleting = false;

        function type() {
            currentText = texts[count];
            
            if (isDeleting) {
                typeElement.textContent = currentText.substring(0, index - 1);
                index--;
            } else {
                typeElement.textContent = currentText.substring(0, index + 1);
                index++;
            }
            
            let typingSpeed = 100; 
            if (isDeleting) {
                typingSpeed /= 2; 
            }
            
            if (!isDeleting && index === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; 
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                count++;
                if (count === texts.length) {
                    count = 0; 
                }
                typingSpeed = 500; 
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000); 
    }

    // --- 3. Smooth Scrolling & Active Link Highlighting ---
    const navLinksList = document.querySelectorAll('.nav-link');
    const sectionsElements = document.querySelectorAll('section');

    // Attach smooth scroll logic
    navLinksList.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // account for navbar
                    behavior: 'smooth'
                });
                
                // Close navbar on mobile after clicking
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Observer setup for active links mapping correctly when scrolling
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // clear all highlights
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.style.color = '#e0e0e0';
                });
                
                // highlight active 
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.style.color = '#ffffff'; // pop to true white when active
                }
            }
        });
    }, observerOptions);

    sectionsElements.forEach(section => sectionObserver.observe(section));
});

// --- 4. EmailJS & Contact Form Handling ---
function sendEmail(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_90xi3ih",
    "template_bc1s09d",
    "#contact-form"
  )
  .then(function() {

    // Hide form
    document.getElementById("contact-form").style.display = "none";

    // Show existing Thank You card
    document.getElementById("thank-you-card").style.display = "block";

  }, function(error) {
    alert("Failed to send message. Please try again.");
    console.log(error);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
