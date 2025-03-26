let message = "";
// inputs
const nameInputValue = document.getElementById('nombre');
const phoneInputValue = document.getElementById('telefono');
const passwordInputValue = document.getElementById('password');
const password1InputValue = document.getElementById('password1');
const direccionTextArea = document.getElementById('direccion');
const fechaInputValue = document.getElementById('date');

// divs de error
const errorPassword = document.getElementById('errorPassword');
const errorName = document.getElementById('errorName');
const errorTelefono = document.getElementById('errorTelefono');
const errorDireccion = document.getElementById('errorDireccion');
const errorFecha = document.getElementById('errorFecha');

// btn
const btnSubmit = document.getElementById('btn-submit');

// check phone number
const validationPhoneNumber = () => {
    const regex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/
    if (!regex.test(phoneInputValue.value.trim())) {
        setErrorMessage(`Formato Invalido 'XXX-XXX-XXXX'`, errorTelefono);
        phoneInputValue.classList.add('error');
        return false;
    }
    clearErrorMessage(errorTelefono);
    phoneInputValue.classList.remove('error');
    return true;
}

// // check name
const validationName = () => {
    if (nameInputValue.value.trim().length < 4) {
        setErrorMessage(`Minimo 3 caracteres`, errorName);
        nameInputValue.classList.add('error');
        return false;
    }
    clearErrorMessage(errorName);
    nameInputValue.classList.remove('error');
    return true;
}

// // check password
const validationPasswords = () => {
    const password = passwordInputValue.value.trim();
    const password1 = password1InputValue.value.trim();
    if (password !== password1 && password1.length > 0) {
        setErrorMessage(`Las contraseñas no coinciden`, errorPassword);
        passwordInputValue.classList.add('error');
        password1InputValue.classList.add('error');
        return false;
    }
    clearErrorMessage(errorPassword);
    passwordInputValue.classList.remove('error');
    password1InputValue.classList.remove('error');
    return true;
};

// check direccion
const validationAddress = () => {
    const direccion = direccionTextArea.value.trim();
    if (direccion.length < 10) {
        setErrorMessage('La direccion debe tener 10 caracteres', errorDireccion);
        direccionTextArea.classList.add('error');
        return false;
    }
    clearErrorMessage(errorDireccion);
    direccionTextArea.classList.remove('error');
    return true;
};

const validationDate = () => {
    const age = parseInt(document.getElementById('edad').value.trim(), 10);
    const birthDate = new Date(fechaInputValue.value);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const birthdayPassed = (today.getMonth() > birthDate.getMonth()) ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!birthdayPassed) {
        calculatedAge--;
    }

    if (calculatedAge !== age) {
        setErrorMessage('Fecha de nacimiento incorrecta', errorFecha);
        fechaInputValue.classList.add('error');
        return false;
    }

    clearErrorMessage(errorFecha);
    fechaInputValue.classList.remove('error');
    return true;
};


// events listener
nameInputValue.addEventListener('input', validationName);
phoneInputValue.addEventListener('input', validationPhoneNumber);
passwordInputValue.addEventListener('input', validationPasswords);
password1InputValue.addEventListener('input', validationPasswords);
direccionTextArea.addEventListener('input', validationAddress);
fechaInputValue.addEventListener('input', validationDate);


// desabilitar el buttom
const toggleSubmitButton = () => {
    btnSubmit.disabled = document.querySelector('.alert-message') !== null;
};

// setErrorMessage para actualizar el botón
const setErrorMessage = (message, messageBox) => {
    messageBox.classList.add('alert-message');
    messageBox.innerHTML = `<p>${message}</p>`;
    toggleSubmitButton();
};

// clearErrorMessage para actualizar el botón
const clearErrorMessage = (messageBox) => {
    messageBox.classList.remove('alert-message');
    messageBox.innerHTML = "";
    toggleSubmitButton();
};

// Agregar eventos a los inputs
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', toggleSubmitButton);
});
