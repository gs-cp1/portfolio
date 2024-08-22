// Function to handle the activation of nav links
function setActiveLink(event) {
    // Prevent the default action of the link
    

    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove 'active' class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked link
    const clickedLink = event.currentTarget;
    clickedLink.classList.add('active');
}

// Add event listeners to all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', setActiveLink);
});

//scroll to right position on page
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const navbarCollapse = new bootstrap.Collapse(document.querySelector('#navbarNav'), {
        toggle: false
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const customOffset = 10; // Adjust this value for additional space
                const offset = navbarHeight + customOffset; // Combine navbar height and custom offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Collapse the navbar
                if (navbarCollapse._isShown()) {
                    navbarCollapse.hide();
                }
            }
        });
    });
});


  