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
const password = document.querySelector('#password');
const passwordError = document.querySelector('#password + span.error');
const confirmPassword = document.querySelector('#confirm-password');
const confirmPasswordError = document.querySelector('#confirm-password + span.error');

password.addEventListener('input', () => {
    if (password.validity.valid) {
        passwordError.textContent = '';
        passwordError.className = 'error';
    } else {
        displayPasswordError();
    }
});

function displayPasswordError() {
    if (password.validity.valueMissing) {
        passwordError.textContent = 'This field cannot be empty';
    } else if (password.validity.tooShort) {
        passwordError.textContent = 'Password must be 8 characters long minimum'
    }

    passwordError.className = 'error active';
}

confirmPassword.addEventListener('input', () => {
    console.log(confirmPassword.value + ' : ' + password.value);
    if (confirmPassword.validity.valid) {
        if (confirmPassword.value !== password.value) {
            confirmPasswordError.className = 'error active';
            confirmPasswordError.textContent = 'This is not the same password !';
        } else {
            confirmPasswordError.textContent = '';
            confirmPasswordError.className = 'error';
        }
    } else {
        displayConfirmPasswordError();
    }
});

function displayConfirmPasswordError() {
    if (confirmPassword.validity.valueMissing) {
        confirmPasswordError.textContent = 'Please Confirm your password here ! ';
    } else if (confirmPassword.validity.tooShort) {
        confirmPasswordError.textContent = 'This must be 8 characters minimum';
    }

    confirmPasswordError.className = 'error active';
}