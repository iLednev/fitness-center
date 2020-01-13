'use strict';

var switchesList = document.querySelector('.abonements__switches');
var switchesItems = Array.from(switchesList.children);
var buttons = document.querySelectorAll('.abonements-switches__button');
var tariffs = document.querySelectorAll('.abonements__tariffs');

switchesList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('abonements-switches__button')) {
    tariffs.forEach(function (item) {
      if (!item.classList.contains('hidden')) {
        item.classList.add('hidden');
      }
    });
    buttons.forEach(function (item) {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    var indexTarget = switchesItems.indexOf(target.parentElement);
    tariffs[indexTarget].classList.remove('hidden');
    target.classList.add('active');
  }
});
