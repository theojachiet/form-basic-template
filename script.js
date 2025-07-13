const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submitted');
});

//EMAIL HANDLING

const email = document.querySelector('#email');
const emailError = document.querySelector('#email + span.error');

processInputs(email, emailError, displayMailError);

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

//POSTAL CODE and COUNTRY HANDLING

const countrySelector = document.querySelector('#country');
const postalCode = document.querySelector('#postal-code');
const postalCodeError = document.querySelector('#postal-code + span.error');

let selectedCountry = '';

countrySelector.addEventListener('input', () => {
    selectedCountry = countrySelector.value;
    changePattern(selectedCountry);
});

function changePattern(country) {
    if (country = 'France') {
        postalCode.max = 99999;
    }
}

processInputs(postalCode, postalCodeError, displayPostalError);

function displayPostalError() {
    if (postalCode.validity.valueMissing) {
        postalCodeError.textContent = 'This field cannot be empty';
    } else if (postalCode.validity.tooLong) {
        postalCodeError.textContent = 'Too long';
    } else if (postalCode.validity.patternMismatch) {
        postalCodeError.textContent = 'Not the right pattern';
    }

    postalCodeError.className = 'error active';
}

function processInputs(input, inputError, displayInputError) {
    input.addEventListener('input', () => {
        console.log(input.validity.rangeOverflow);
        if (input.validity.valid) {
            inputError.textContent = '';
            inputError.className = 'error';
        } else {
            console.log('error');
            displayInputError();
        }
    });
}