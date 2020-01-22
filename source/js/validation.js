'use strict';
var telInputs = document.querySelectorAll('input[type="tel"]');

telInputs.forEach(function (item) {
  item.addEventListener('keydown', function (evt) {
    if (evt.code.includes('Key')) {
      evt.preventDefault();
    }
  });
});
