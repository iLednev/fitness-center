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

'use strict';

var TRAINERSCONTAINER = document.querySelector('.trainers__slider-container');
var FEEDBACKCONTAINER = document.querySelector('.feedback__slider-container');

function GetData(slider, items, arrowClass) {
  this.arrow = {
    all: arrowClass,
    left: arrowClass + '--left',
    right: arrowClass + '--right'
  };
  this.slider = slider;
  this.sliderItems = items;
  this.itemMargin = this.sliderItems[1].offsetLeft - this.sliderItems[0].offsetWidth;
  this.itemIndent = this.sliderItems[0].offsetWidth + this.itemMargin;

  this.itemsCount = (this.slider.offsetWidth + this.itemMargin) / this.itemIndent;
  this.maxLeftShift = (this.sliderItems.length * this.itemIndent - this.itemsCount * this.itemIndent) * -1;
  this.shiftIncrement = this.itemIndent * this.itemsCount;
  this.maxRightShift = 0;
  this.shift = 0;
}

function checkClass(element, className) {
  return element.classList.contains(className);
}

function checkPageWidth() {
  var newPageStatus = '';
  if (window.outerWidth >= breakpoints.desktopFull) {
    newPageStatus = 'desktopFull';
  } else if (window.outerWidth <= breakpoints.desktopClipped && window.outerWidth > breakpoints.tabletFull) {
    newPageStatus = 'desktopClipped';
  } else if (window.outerWidth <= breakpoints.tabletFull && window.outerWidth > breakpoints.tabletClipped) {
    newPageStatus = 'tabletFull';
  } else if (window.outerWidth <= breakpoints.tabletClipped && window.outerWidth > breakpoints.mobile) {
    newPageStatus = 'tabletClipped';
  } else if (window.outerWidth <= breakpoints.mobile) {
    newPageStatus = 'mobile';
  }

  if (newPageStatus !== pageStatus) {
    pageStatus = newPageStatus;
    feedback = new GetData(feedbackSlider, feedbackItems, 'feedback__arrow');
    resetCards(feedback, feedback.sliderItems);
    trainers = new GetData(trainersSlider, trainersItems, 'trainers__arrow');
    resetCards(trainers, trainers.sliderItems);
  }
}

function resetCards(sliderObj, cards) {
  cards.forEach(function (item) {
    item.style.transform = 'translateX(' + sliderObj.shift + 'px)';
  });
}

function switchSlider(sliderObj, target) {
  if (checkClass(target, sliderObj.arrow.all)) {
    if (checkClass(target, sliderObj.arrow.right)) {
      sliderObj.shift = sliderObj.shift - sliderObj.shiftIncrement >= sliderObj.maxLeftShift ? sliderObj.shift -= sliderObj.shiftIncrement : sliderObj.shift = sliderObj.maxLeftShift;
    } else if (checkClass(target, sliderObj.arrow.left)) {
      sliderObj.shift = sliderObj.shift + sliderObj.shiftIncrement <= sliderObj.maxRightShift ? sliderObj.shift += sliderObj.shiftIncrement : sliderObj.shift = sliderObj.maxRightShift;
    }

    sliderObj.sliderItems.forEach(function (item) {
      item.style.transform = 'translateX(' + sliderObj.shift + 'px)';
    });
  }
}
var trainersSlider = document.querySelector('.trainers__list');
var feedbackSlider = document.querySelector('.feedback__list');
var trainersItems = document.querySelectorAll('.trainer-card');
var feedbackItems = document.querySelectorAll('.feedback-card');
var feedback = new GetData(feedbackSlider, feedbackItems, 'feedback__arrow');
var trainers = new GetData(trainersSlider, trainersItems, 'trainers__arrow');
var pageStatus = '';
var breakpoints = {
  desktopFull: 1366,
  desktopClipped: 1365,
  tabletFull: 1199,
  tabletClipped: 1023,
  mobile: 767
};

checkPageWidth();

window.addEventListener('resize', function () {
  checkPageWidth();
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

//# sourceMappingURL=script.js.map
