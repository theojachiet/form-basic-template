const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submitted');
});

function processInputs(input, inputError, displayInputError) {
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            inputError.textContent = '';
            inputError.className = 'error';
        } else {
            displayInputError();
        }
    });
}

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
let validPostCode = false;

countrySelector.addEventListener('input', () => {
    selectedCountry = countrySelector.value;
    changePattern(selectedCountry);
});

function changePattern(country) {
    if (country = 'France') {
        postalCode.max = 99999;
    }
}


function displayPostalError() {
    if (postalCode.validity.valueMissing) {
        postalCodeError.textContent = 'This field cannot be empty';
    } else if (!validPostCode) {
        console.log('invalid postcode !');
        postalCodeError.textContent = 'invalid postcode !';
    } else if (postalCode.validity.patternMismatch) {
        postalCodeError.textContent = 'Not the right pattern';
    }

    postalCodeError.className = 'error active';
}

//REGEX TESTING

function validatePostcode(postcode) {
    var Reg = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/i);
    return Reg.test(postcode);
}

postalCode.addEventListener('input', () => {
    if (validatePostcode(postalCode.value)) {
        validPostCode = true;
        if (postalCode.validity.valid) {
            postalCodeError.textContent = '';
            postalCodeError.className = 'error';
        } else {
            displayPostalError();
        }
    } else {
        validPostCode = false;
        displayPostalError();
    }
});