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
