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
