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
    console.log(country);
    if (country === 'France') {
        postalCode.setAttribute('placeholder', '31820');
    } else if (country === 'Italy') {
        postalCode.setAttribute('placeholder', '56321');
    } else if (country === 'Swisss') {
        postalCode.setAttribute('placeholder', '2222');
    }
}


function displayPostalError() {
    if (postalCode.validity.valueMissing) {
        postalCodeError.textContent = 'This field cannot be empty';
    } else if (!validPostCode) {
        postalCodeError.textContent = 'invalid postcode !';
    }

    postalCodeError.className = 'error active';
}

//REGEX TESTING

function validatePostcode(postcode) {
    if (selectedCountry === 'France') {
        let Reg = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/i);
        return Reg.test(postcode);
    } else if (selectedCountry === 'Italy') {
        let Reg = new RegExp(/^\d{5}$/);
        return Reg.test(postcode);
    } else if (selectedCountry === 'Swiss') {
        let Reg = new RegExp(/^[1-9]\d{3}$/);
        return Reg.test(postcode);
    }
}

postalCode.addEventListener('input', () => {
    console.log();
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

//PASSWORD HANDLING
