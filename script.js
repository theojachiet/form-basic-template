const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submitted');
});

const email = document.querySelector('#email');
const emailError = document.querySelector('#email + span.error');

email.addEventListener('input', () => {
    if (email.validity.valid) {
        emailError.textContent = '';
        emailError.className = 'error';
    } else {
        displayMailError();
    }
});

function displayMailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = 'This field cannot be empty';
    } else if (email.validity.tooShort) {
        emailError.textContent = `The email must be ${email.minLength} characters minimum`;
    } else if (email.validity.typeMismatch) {
        emailError.textContent = 'The value should be an email';
    }

    emailError.className = 'error active';
}