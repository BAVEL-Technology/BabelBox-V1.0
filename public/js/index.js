// ====================================================
// DEPENDENCIES
// ====================================================
// import GSAP as a dependency
import { gsap } from 'gsap';
// start Barba
Barba.Pjax.start();

// ====================================================
// WORKING JS
// ====================================================
$(document).ready(function() {
    
    // GSAP Timeline
    const pageTransition = () => {
        let timeline = gsap.timeline();
        // this is where the 5 list items come up on the page during the animation
        timeline.to("ul.transition li", {
          duration: 0.5,
          scaleY: 1,
          transformOrigin: "bottom left",
          stagger: 0.2,
        });
        timeline.to("ul.transition li", {
          duration: 0.5,
          scaleY: 0,
          transformOrigin: "bottom left",
          stagger: 0.1,
          delay: 0.2,
        });
      }
})