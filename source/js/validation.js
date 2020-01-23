'use strict';
var inputName = document.querySelector('input[type="text"]');
var inputTel = document.querySelector('input[type="tel"]');
var submit = document.querySelector('.free-lesson__submit');

var nameField = {
  inputs: inputName,
  check: /[^A-zА-я'\s]/,
  string: 'Имя не должно содержать цифр и спецсимволов'
};

var telField = {
  inputs: inputTel,
  check: /[^\d()\s-+_]/,
  string: 'Телефон должен содержать только цифры'
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

checkInputs(nameField.inputs, nameField.check, nameField.string);
checkInputs(telField.inputs, telField.check, telField.string);

var temp;
var char;
var backspace;

submit.addEventListener('click', function () {
  if (inputName.value === '' || inputTel.value === '') {
    submit.setCustomValidity('Не должно быть пустых полей');
  } else {
    submit.setCustomValidity('');
  }
});

inputTel.addEventListener('focus', function () {
  inputTel.value = inputTel.value === '' ? '+7 (___) ___ __-__' : inputTel.value;
  inputTel.setSelectionRange(4, 4);
});

inputTel.addEventListener('keydown', function (evt) {
  backspace = false;
  if (evt.code !== 'Backspace') {
    if (inputTel.value.length >= 18 && !inputTel.value.includes('_')) {
      evt.preventDefault();
    } else if (/\d/.test(evt.key)) {
      char = inputTel.value.indexOf('_');
      inputTel.setSelectionRange(char, char);
    } else {
      evt.preventDefault();
    }
  } else {
    backspace = true;
  }
});

inputTel.addEventListener('input', function () {
  if (!backspace) {
    inputTel.value.replace(/\d_/, function (match) {
      temp = match.charAt(0);
    });

    inputTel.setRangeText(temp, char, char + 2);
    inputTel.setSelectionRange(char + 1, char + 1);
  }
});
