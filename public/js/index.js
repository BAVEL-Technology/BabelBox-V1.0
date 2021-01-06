/*
 * Parse DOM for twemojis
 * use npm twemoji to convert from emoji to twemoij
 */
twemoji.parse(document.body);

// ====================================================
// BARBA CONFIGURATION
// ====================================================
import barba from "@barba/core";
import barbaCss from "@barba/css";

barba.use(barbaCss);

// ====================================================
// GSAP AND BARBA PAGE TRANSITION ANIMATION PROPERTIES
// ====================================================

// basic barba/gsap page transition animation
barba.init({
  transitions: [
   {
     once() {
       opacity: 0;
     }
     .barba-once-active {
       transition: all 1s linear;
     }
     .barba-once-to {
       opacity: 1;
     }
   }
  ],
});
