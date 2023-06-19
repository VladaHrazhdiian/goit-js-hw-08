import throttle from 'lodash.throttle';

const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');
const formEl = document.querySelector('.feedback-form');
const errorMessageEl = document.querySelector('.error-message');

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

populateForm();

function onFormSubmit(ev) {
  ev.preventDefault();

  if (textareaEl.value === '' || inputEl.value === '') {
    errorMessageEl.innerText = 'Please fill in all fields.';
    errorMessageEl.style.display = 'block';
    return;
  }

  console.log(formData);

  ev.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function onFormInput(ev) {
  formData[ev.target.name] = ev.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  errorMessageEl.style.display = 'none';
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData.email) {
    inputEl.value = savedData.email;
    formData.email = savedData.email;
  }

  if (savedData.message) {
    textareaEl.value = savedData.message;
    formData.message = savedData.message;
  }
}