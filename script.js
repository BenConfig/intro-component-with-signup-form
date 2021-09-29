const FORM = document.querySelector('.form');
const FORM_INPUTS = document.querySelectorAll('.form-input');

// Listen for any input fields that do not match specified regex (see HTML 'pattern' attribute)
FORM_INPUTS.forEach( input => {
    input.addEventListener('invalid', (e) => {
        // Remove default error messages supplied by browser
        e.preventDefault();

        // Get HTML element containing aria-live attribute...
        const FORM_MESSAGE = FORM.firstElementChild;

        // and add text to show the form submitted is invalid
        if (FORM_MESSAGE.textContent === '') {
            FORM_MESSAGE.textContent = 'Form is invalid, check for inputs'
        }

        // Get HTML elements in relation to input field
        const PARENT_EL = e.target.parentElement;
        const FIELD_NAME = e.target.previousElementSibling.textContent;
        const ERROR_MESSAGE = e.target.nextElementSibling;

        // Add aria-invalid="true" to input field
        e.target.setAttribute('aria-invalid', 'true');

        // Add aria-describedby attribute to input field
        e.target.setAttribute('aria-describedby', FIELD_NAME.toLowerCase().replace(' ', '-') + '-error');

        // Add 'error' class to parent of input field
        PARENT_EL.classList.add('error');

        // If input field is left blank...
        if (e.target.value === '') {
            ERROR_MESSAGE.textContent = FIELD_NAME + ' cannot be empty';
        }
        // Else if input field is First Name or Last Name...
        else if (e.target.id === 'first-name' || e.target.id === 'last-name') {
            ERROR_MESSAGE.textContent = FIELD_NAME + ' must only contain letters';
        }
        // Else if input field is Email...
        else if (e.target.id === 'email') {
            ERROR_MESSAGE.textContent = 'Looks like this is not an ' + FIELD_NAME.toLowerCase();
        }
        // Else if input field is Password and character length is less than 8...
        else if (e.target.id === 'password' && e.target.value.length < 8) {
            ERROR_MESSAGE.textContent = FIELD_NAME + ' must be at least 8 characters';
        }
        // Else if input field is Password and character length is 8 or above...
        else if (e.target.id === 'password') {
            ERROR_MESSAGE.textContent = FIELD_NAME + ' contains invalid characters';
        }
    });
});

// Remove 'error' styles when user attempts to correct error
FORM_INPUTS.forEach( input => {
    input.addEventListener('input', (e) => {
        const PARENT_EL = e.target.parentElement;

        // Remove aria-invalid="true" from input field
        e.target.removeAttribute('aria-invalid');

        // Remove aria-describedby attribute from input field
        e.target.removeAttribute('aria-describedby');

        // Remove 'error' styles from parent of input field
        PARENT_EL.classList.remove('error');
   });
});

// This only runs once all input fields are valid
FORM.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get HTML element containing aria-live attribute...
    const FORM_MESSAGE = FORM.firstElementChild;

    // and add text to show the form submitted is valid
    FORM_MESSAGE.textContent = 'Form submission successful'
})