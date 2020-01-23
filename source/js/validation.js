'use strict';
var inputTel = document.querySelector('input[type="tel"]');
var inputSubmit = document.querySelector('.free-lesson__submit');
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

var inputName = document.querySelector('input[type="text"]');
var submit = document.querySelector('.free-lesson__submit');
// eslint-disable-next-line
var mask = IMask(inputTel, maskOptions);

var nameField = {
  inputs: inputName,
  check: /[^A-zА-я'\s]/,
  string: 'Имя не должно содержать цифр и спецсимволов'
};

function checkInputs(input, regExp, errorString) {
  input.addEventListener('input', function () {
    if (regExp.test(input.value)) {
      input.setCustomValidity(errorString);
    } else if (input.value === /[\s]/) {
      input.setCustomValidity('Поле не должно быть пустым');
    } else {
      input.setCustomValidity('');
    }
  });
}

inputSubmit.addEventListener('click', function () {
  if (inputTel.value.match(/[\d]/g).length !== 11) {
    inputTel.setCustomValidity('Нужен полный номер');
  } else {
    inputTel.setCustomValidity('');
  }
});

checkInputs(nameField.inputs, nameField.check, nameField.string);

submit.addEventListener('click', function () {
  if (inputName.value === '' || inputTel.value === '') {
    submit.setCustomValidity('Не должно быть пустых полей');
  } else {
    submit.setCustomValidity('');
  }
});
