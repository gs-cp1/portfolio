// Function to handle the activation of nav links
function setActiveLink(event) {
    // Prevent the default action of the link
    event.preventDefault();

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
