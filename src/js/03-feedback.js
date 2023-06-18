import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('[name="email"]');
const textAreaRef = document.querySelector('[name="message"]');

onResetPage();

formRef.addEventListener('input', throttle(onInputHandler, 500));

function onInputHandler(e) {
  let currentLocalStorage = localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email: inputRef.value, message: textAreaRef.value }),
  );
  currentLocalStorage ? JSON.parse(localStorage.getItem('feedback-form-state')) : {};
};

formRef.addEventListener('submit', onSubmitHandler);

function onSubmitHandler(e) {
  e.preventDefault();
  
  const formData = new FormData(formRef);
  formData.forEach((value, name) => console.log(value, name));

  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
};

function onResetPage() {
  let currentLocalStorage = localStorage.getItem('feedback-form-state');
  if (currentLocalStorage) {
    currentLocalStorage = JSON.parse(currentLocalStorage);
    Object.entries(currentLocalStorage).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
};