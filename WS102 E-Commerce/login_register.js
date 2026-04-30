/**
 * Login & Register Form JavaScript
 * Handles form switching, validation, and user authentication status
 */

/**
 * Check login status and update UI accordingly
 */
function checkLoginStatus() {
    const loginBtn = document.getElementById('loginBtn');
    const userProfileIconWrap = document.getElementById('userProfileIconWrap');
    const userIconBtn = document.getElementById('userIconBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

    if (isLoggedIn) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (userProfileIconWrap) userProfileIconWrap.style.display = 'block';
        
        // Load user profile image if available
        const userProfileImg = document.getElementById('userProfileImg');
        const profileImg = localStorage.getItem('userProfileImg');
        if (userProfileImg && profileImg) {
            userProfileImg.src = profileImg;
        }
        
        // Set up logout functionality
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        }
        
        // Set up user menu toggle
        if (userIconBtn) {
            userIconBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const userMenu = document.getElementById('userMenu');
                if (userMenu) {
                    userMenu.style.display = userMenu.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-profile-icon-wrap')) {
                const userMenu = document.getElementById('userMenu');
                if (userMenu) userMenu.style.display = 'none';
            }
        });
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'block';
        if (userProfileIconWrap) userProfileIconWrap.style.display = 'none';
    }
}

/**
 * Logout user and clear session/localStorage
 */
function logout() {
    // Call server to destroy session
    fetch('session_check.php?action=logout')
        .then(response => response.json())
        .then(data => {
            // Clear localStorage
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('userProfileImg');
            window.location.href = 'WS_Ecommerce.html';
        })
        .catch(error => {
            console.error('Logout error:', error);
            // Still clear localStorage and redirect even if server call fails
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('userProfileImg');
            window.location.href = 'WS_Ecommerce.html';
        });
}

// Check login status when page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);

/**
 * Show/toggle between login and register forms
 * @param {string} formId - The ID of the form to show
 */
function showForm(formId) {
    // Hide all forms
    document.querySelectorAll(".form-box").forEach(form => {
        form.classList.remove("active");
    });
    
    // Show the selected form
    if (document.getElementById(formId)) {
        document.getElementById(formId).classList.add("active");
    }
    
    // Scroll to top of form
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Form validation before submission
 */
function validateLoginForm() {
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return false;
    }
    return true;
}

function validateRegisterForm() {
    const name = document.getElementById('name-register').value;
    const email = document.getElementById('email-register').value;
    const password = document.getElementById('password-register').value;
    
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }
    
    return true;
}
