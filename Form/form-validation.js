const fullNameEl = document.querySelector('#full-name');
const birthDateEl = document.querySelector('#birth-date');
const emailEl = document.querySelector('#email');
const phoneNumberEl = document.querySelector('#phone-number');
const adressEl = document.querySelector('#adress');
const dropdownEl = document.querySelector('#faq-select');
const textareaEl = document.querySelector('#questionTextarea');
const termAndCondEl = document.querySelector('#agreement');
const form = document.querySelector('#contact-form');

document.getElementById('question').disabled = true;

const hasValue = (value) => (value === '' ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isDateValid = (stringDate) => {
  const today = new Date();
  const date = new Date(stringDate);

  if (date.getFullYear() > today.getFullYear()) {
    return false;
  } else if (date.getFullYear() === today.getFullYear()) {
    if (date.getMonth() > today.getMonth()) {
      return false;
    } else if (date.getMonth() === today.getMonth()) {
      if (date.getDate() > today.getDate()) return false;
    }
  }
  return true;
};

const isPhoneNumberValid = (phoneNumber) => {
  let reg = new RegExp();
  reg = /\+?[\d{6}\d{10}\d{11}\d{13}]/g;

  if (!isBetween(phoneNumber.length, 6, 13)) {
    return false;
  } else if (!reg.test(phone)) {
    return false;
  }
  return true;
};

const isEmailValid = (email) => {
  let reg = new RegExp();
  reg = /([A-Za-z0-9\-\_\.]+)@([A-Za-z0-9\-\_\.]+)\.[A-Za-z]\w+/g;
  return reg.test(email);
};

const isAdressValid = (adress) => {
  if (!isBetween(adress.length, 6, 30)) {
    return false;
  }
  return true;
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add('error');
  const error = input.closest('div').querySelector('small');
  error.textContent = message;
  input.onchange = (e) => {
    console.log(e);
    formField.classList.remove('error');
    error.textContent = '';
  };
};

const checkName = () => {
  let valid = false;
  const name = fullNameEl.value.trim();
  const reWhiteSpace = new RegExp('[ x]');

  if (!hasValue(name)) {
    showError(fullNameEl, 'This field is mandatory');
  } else if (!reWhiteSpace.test(name)) {
    showError(fullNameEl, 'The name is not valid');
  } else {
    valid = true;
  }

  return valid;
};

const checkBirthDate = () => {
  let valid = false;
  const birthDate = birthDateEl.value;

  if (!hasValue(birthDate)) {
    showError(birthDateEl, 'This field is mandatory');
  } else if (!isDateValid(birthDate)) {
    showError(birthDateEl, 'The birth date is not valid');
  } else {
    valid = true;
  }

  return valid;
};

const checkEmail = () => {
  let valid = false;

  const email = emailEl.value.trim();

  if (!hasValue(email)) {
    showError(emailEl, 'This field is mandatory');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'The email is not valid');
  } else {
    valid = true;
  }

  return valid;
};

const checkPhoneNumber = () => {
  let valid = false;
  const phoneNumber = phoneNumberEl.value.replaceAll(' ', '');

  if (!hasValue(phoneNumber)) {
    showError(phoneNumberEl, 'This field is mandatory');
  } else if (!isPhoneNumberValid(phoneNumber)) {
    showError(phoneNumberEl, 'The phone number is not valid');
  } else {
    valid = true;
  }

  return valid;
};

const checkAddress = () => {
  let valid = false;

  const adress = adressEl.value;

  if (!hasValue(adress)) {
    showError(adressEl, 'This field is mandatory');
  } else if (!isAdressValid(adress)) {
    showError(adressEl, 'The adress is not valid, please add all details');
  } else {
    valid = true;
  }

  return valid;
};

const checkQuestion = () => {
  let valid = false;
  const questionOnTextarea = textareaEl.value;
  const questionOnDropdown = dropdownEl.value;
  const dropdownExists = !!document.getElementById('faq-select').offsetParent;

  if (!hasValue(questionOnTextarea) && dropdownExists === false) {
    showError(
      textareaEl,
      'This field is mandatory. Please ask your question bellow'
    );
  } else if (!hasValue(questionOnTextarea) && !questionOnDropdown) {
    showError(
      textareaEl,
      'This field is mandatory. Please choose one option or ask your question bellow'
    );
  } else {
    valid = true;
  }
  return valid;
};

const checkTermAndCondCheck = () => {
  let valid = false;

  if (!termAndCondEl.checked) {
    showError(
      termAndCondEl,
      'Check the terms and conditions before proceeding'
    );
  } else {
    valid = true;
  }
  return valid;
};

const formValidator = () => {
  const isMember = document.getElementById('member-status-1').checked;
  const isFormQuestionAsked = checkQuestion(),
    isFormTermAndCondChecked = checkTermAndCondCheck();

  if (isMember) {
    return isFormQuestionAsked && isFormTermAndCondChecked;
  }

  const isFormNameValid = checkName(),
    isFormEmailValid = checkEmail(),
    isFormBirthDateValid = checkBirthDate(),
    isFormPhoneNumberValid = checkPhoneNumber(),
    isFormAdressValid = checkAddress();

  const isFormValid =
    isFormNameValid &&
    isFormBirthDateValid &&
    isFormEmailValid &&
    isFormPhoneNumberValid &&
    isFormAdressValid &&
    isFormQuestionAsked &&
    isFormTermAndCondChecked;

  return isFormValid;
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const isFormValid = formValidator();

  if (isFormValid) console.log('Success!');
  return false;
});

const faqEl = document.getElementById('faq-select__options');

faqEl.addEventListener('click', function (e) {
  document.getElementById('question').value = e.target.textContent;
});

document
  .getElementById('member-status-1')
  .addEventListener('change', formValidator);
