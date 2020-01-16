'use strict';

function checkClass(element, className) {
  return element.classList.contains(className);
}

function refreshData() {
  slider = document.querySelector('.trainers__list');
  sliderItems = document.querySelectorAll('.trainer-card');
  itemMargin = sliderItems[1].offsetLeft - sliderItems[0].offsetWidth;
  itemIndent = sliderItems[0].offsetWidth + itemMargin; // Ширина элемента + его отступ
  itemsCount = (slider.offsetWidth + itemMargin) / itemIndent;
  maxLeftShift = (sliderItems.length * itemIndent - itemsCount * itemIndent) * -1;
  shiftIncrement = itemIndent * itemsCount;
  maxRightShift = 0;
  shift = 0;

  sliderItems.forEach(function (item) {
    item.style.transform = 'translateX(' + shift + 'px)';
  });
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
    refreshData();
  }
}

var buttonsContainer = document.querySelector('.trainers__slider-buttons');
var slider = document.querySelector('.trainers__list');
var sliderItems = document.querySelectorAll('.trainer-card');
var itemMargin = sliderItems[1].offsetLeft - sliderItems[0].offsetWidth;
var itemIndent = sliderItems[0].offsetWidth + itemMargin; // Ширина элемента + его отступ

var itemsCount = (slider.offsetWidth + itemMargin) / itemIndent;
var maxLeftShift = (sliderItems.length * itemIndent - itemsCount * itemIndent) * -1;
var shiftIncrement = itemIndent * itemsCount;
var maxRightShift = 0;
var shift = 0;

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

buttonsContainer.addEventListener('click', function (evt) {
  var target = evt.target;
  if (checkClass(target, 'trainers__arrow')) {
    if (checkClass(target, 'trainers__arrow--right')) {
      shift = shift - shiftIncrement >= maxLeftShift ? shift -= shiftIncrement : shift = maxLeftShift;
    } else if (checkClass(target, 'trainers__arrow--left')) {
      shift = shift + shiftIncrement <= maxRightShift ? shift += shiftIncrement : shift = maxRightShift;
    }

    sliderItems.forEach(function (item) {
      item.style.transform = 'translateX(' + shift + 'px)';
    });
  }
});
