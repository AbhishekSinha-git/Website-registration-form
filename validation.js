/**
 * Registration Form Validation
 * 
 * This script handles validation for the registration form.
 * It validates all input fields and displays appropriate error messages.
 */

// Get DOM elements when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form and form elements
    const form = document.getElementById('registrationForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    // Error message elements
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Success message container
    const successMessage = document.getElementById('successMessage');
    
    // Input event listeners for real-time validation
    firstName.addEventListener('input', function() {
        validateField(firstName, firstNameError, validateName);
    });
    
    lastName.addEventListener('input', function() {
        validateField(lastName, lastNameError, validateName);
    });
    
    email.addEventListener('input', function() {
        validateField(email, emailError, validateEmail);
    });
    
    password.addEventListener('input', function() {
        validateField(password, passwordError, validatePassword);
    });
    
    // Form submission event handler
    form.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Validate all fields
        const isFirstNameValid = validateField(firstName, firstNameError, validateName);
        const isLastNameValid = validateField(lastName, lastNameError, validateName);
        const isEmailValid = validateField(email, emailError, validateEmail);
        const isPasswordValid = validateField(password, passwordError, validatePassword);
        
        // If all validations pass, process the form
        if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
            // Form is valid, show success message
            successMessage.style.display = 'block';
            
            // Optionally reset the form after successful submission
            form.reset();
            
            // Remove success message after 5 seconds
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
            
            // In a real application, you would typically send the form data to a server here
            console.log('Form submitted successfully with data:', {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value // In a real app, you'd never log passwords
            });
        }
    });
    
    /**
     * Validates a field using the specified validation function
     * @param {HTMLElement} field - The input field to validate
     * @param {HTMLElement} errorElement - The element to display error message
     * @param {Function} validationFunction - The function to validate the field
     * @returns {boolean} - Whether the field is valid
     */
    function validateField(field, errorElement, validationFunction) {
        const value = field.value.trim();
        const validationResult = validationFunction(value);
        
        if (!validationResult.isValid) {
            // Show error message
            errorElement.textContent = validationResult.message;
            // Add invalid class to the input
            field.classList.add('invalid');
            return false;
        } else {
            // Clear error message
            errorElement.textContent = '';
            // Remove invalid class
            field.classList.remove('invalid');
            return true;
        }
    }
    
    /**
     * Validates a name field (first or last name)
     * @param {string} value - The value to validate
     * @returns {Object} - Validation result with isValid flag and error message
     */
    function validateName(value) {
        if (value === '') {
            return {
                isValid: false,
                message: 'This field is required'
            };
        }
        
        // Optional: Add more validation rules for names if needed
        // For example, check if it contains only letters
        if (!/^[A-Za-z\s'-]+$/.test(value)) {
            return {
                isValid: false,
                message: 'Please enter a valid name (letters, spaces, hyphens and apostrophes only)'
            };
        }
        
        return {
            isValid: true,
            message: ''
        };
    }
    
    /**
     * Validates an email address
     * @param {string} value - The email to validate
     * @returns {Object} - Validation result with isValid flag and error message
     */
    function validateEmail(value) {
        if (value === '') {
            return {
                isValid: false,
                message: 'Email is required'
            };
        }
        
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return {
                isValid: false,
                message: 'Please enter a valid email address'
            };
        }
        
        return {
            isValid: true,
            message: ''
        };
    }
    
    /**
     * Validates a password
     * @param {string} value - The password to validate
     * @returns {Object} - Validation result with isValid flag and error message
     */
    function validatePassword(value) {
        if (value === '') {
            return {
                isValid: false,
                message: 'Password is required'
            };
        }
        
        if (value.length < 8) {
            return {
                isValid: false,
                message: 'Password must be at least 8 characters long'
            };
        }
        
        // Optional: Add more password validation rules if needed
        // For example, check for uppercase, lowercase, numbers, etc.
        
        return {
            isValid: true,
            message: ''
        };
    }
});