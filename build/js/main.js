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


'use strict';

var TRAINERSCONTAINER = document.querySelector('.trainers__slider-container');
var FEEDBACKCONTAINER = document.querySelector('.feedback__slider-container');

function GetData(slider, items, arrowClass, wrapper) {
  this.arrow = {
    all: arrowClass,
    left: arrowClass + '--left',
    right: arrowClass + '--right'
  };
  this.slider = slider;
  this.wrapper = wrapper;
  this.sliderItems = items;
  this.itemMargin = this.sliderItems[1].offsetLeft - this.sliderItems[0].offsetWidth;
  this.itemIndent = this.sliderItems[0].offsetWidth + this.itemMargin;

  this.itemsCount = (this.wrapper.offsetWidth + this.itemMargin) / this.itemIndent;
  this.maxLeftShift = (this.sliderItems.length * this.itemIndent - this.itemsCount * this.itemIndent) * -1;
  this.shiftIncrement = this.itemIndent * this.itemsCount;
  this.maxRightShift = 0;
  this.shift = 0;
}

function checkClass(element, className) {
  return element.classList.contains(className);
}

function refreshObj() {
  feedback = new GetData(feedbackSlider, feedbackItems, 'feedback__arrow', feedbackWrapper);
  resetCards(feedback, feedback.sliderItems);
  trainers = new GetData(trainersSlider, trainersItems, 'trainers__arrow', trainersWrapper);
  resetCards(trainers, trainers.sliderItems);
}

function resetCards(sliderObj) {
  sliderObj.slider.style.transform = 'translateX(0)';
}

function switchSlider(sliderObj, target) {
  if (checkClass(target, sliderObj.arrow.all)) {
    if (checkClass(target, sliderObj.arrow.right)) {
      sliderObj.shift = sliderObj.shift - sliderObj.shiftIncrement >= sliderObj.maxLeftShift ? sliderObj.shift -= sliderObj.shiftIncrement : sliderObj.shift = sliderObj.maxLeftShift;
    } else if (checkClass(target, sliderObj.arrow.left)) {
      sliderObj.shift = sliderObj.shift + sliderObj.shiftIncrement <= sliderObj.maxRightShift ? sliderObj.shift += sliderObj.shiftIncrement : sliderObj.shift = sliderObj.maxRightShift;
    }

    sliderObj.slider.style.transform = 'translateX(' + sliderObj.shift + 'px)';
  }
}
var trainersSlider = document.querySelector('.trainers__list');
var feedbackSlider = document.querySelector('.feedback__list');
var trainersWrapper = document.querySelector('.trainers__list-wrapper');
var feedbackWrapper = document.querySelector('.feedback__list-wrapper');
var trainersItems = document.querySelectorAll('.trainer-card');
var feedbackItems = document.querySelectorAll('.feedback-card');
var feedback = new GetData(feedbackSlider, feedbackItems, 'feedback__arrow', feedbackWrapper);
var trainers = new GetData(trainersSlider, trainersItems, 'trainers__arrow', trainersWrapper);

refreshObj();

window.addEventListener('resize', function () {
  refreshObj();
});

TRAINERSCONTAINER.addEventListener('click', function (evt) {
  var target = evt.target;
  switchSlider(trainers, target);
});

FEEDBACKCONTAINER.addEventListener('click', function (evt) {
  var target = evt.target;
  switchSlider(feedback, target);
});

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

//# sourceMappingURL=main.js.map
