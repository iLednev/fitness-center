"use strict";var switchesList=document.querySelector(".abonements__switches"),switchesItems=Array.from(switchesList.children),buttons=document.querySelectorAll(".abonements-switches__button"),tariffs=document.querySelectorAll(".abonements__tariffs");switchesList.addEventListener("click",function(t){var s=t.target;if(s.classList.contains("abonements-switches__button")){tariffs.forEach(function(t){t.classList.contains("hidden")||t.classList.add("hidden")}),buttons.forEach(function(t){t.classList.contains("active")&&t.classList.remove("active")});var e=switchesItems.indexOf(s.parentElement);tariffs[e].classList.remove("hidden"),s.classList.add("active")}});
//# sourceMappingURL=script.js.map
