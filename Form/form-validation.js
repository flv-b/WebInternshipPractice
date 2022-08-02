const fullNameEl = document.querySelector('#full-name');
const birthDateEl = document.querySelector('#birth-date');
const emailEl = document.querySelector('#email');
const phoneNumberEl = document.querySelector('#phone-number');
const adressEl = document.querySelector('#adress');
const dropdownEl = document.querySelector('#faq-select');
const termAndCondEl = document.querySelector('#agreement');

const form = document.querySelector('#contact-form');

const isRequired = value => value === ''? false: true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isDateValid = (date) => {
  const today = new Date();

  if(date.getFullYear() > today.getFullYear())
    return false;
    else if(date.getFullYear() === today.getFullYear()) {
      if(date.getMonth() > today.getMonth()) {
        return false
      }else if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() ){
        if(date.getDate() > today.getDate())
          return false
      }
    }
};



const isEmailValid = (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add('error');
  const error = formField.querySelector('small');
  error.textContent = message;
  input.onchange = (e) => {
    console.log(e)
    formField.classList.remove('error');
    error.textContent = ""
  }
};

const checkName = () => {
  let valid = false;
  const name = fullNameEl.value.trim();
  const reWhiteSpace = new RegExp("[ x]");
  
  if(!isRequired(name)){
    showError(fullNameEl,'This field is mandatory');
  } else if (!reWhiteSpace.test(name)){
    showError(fullNameEl, 'The name is not valid')
  } else{
    valid = true;
  }
  
  return valid;
};

const checkBirthDate = () => {
  let valid = false;
  const birthDate = birthDateEl;
  
  if(!isRequired(birthDate)){
    showError(birthDateEl,'This field is mandatory');
  } else if (!isDateValid){
    showError(birthDateEl,'The birth date is not valid')
  } else{
    valid = true; 
  }
  
  return valid;
};

const checkEmail = () => {
  let valid = false;
  
  const email = emailEl.value.trim();
  
  if(!isRequired(email)){
    showError(emailEl, 'This field is mandatory');
  } else if (!isEmailValid(email)){
    showError(emailEl, 'The email is not valid');
  } else{
    valid = true;
  }
  
  return valid;
};

form.addEventListener('submit', function(e){
  e.preventDefault();

  let isNameValid = checkName(),
      isEmailValid = checkEmail(),
      isBirthDateValid = checkBirthDate();

  let isFormValid = isNameValid &&
      isBirthDateValid &&
      isBirthDateValid;

  if(isFormValid)
    console.log('Success!');
    return false
});
