/*
 * Parse DOM for twemojis
 * use npm twemoji to convert from emoji to twemoij
 */
twemoji.parse(document.body);

// ====================================================
// GSAP AND BARBA PAGE TRANSITION ANIMATION PROPERTIES
// ====================================================
$(document).ready(function () {
  // // GSAP Timeline
  // const pageTransition = () => {
  //   let timeline = gsap.timeline();
  //   // this is where the 3 list items come up on the page during the animation
  //   timeline.to("ul.transition li", {
  //     duration: 0.5,
  //     scaleY: 1,
  //     transformOrigin: "bottom left",
  //     stagger: 0.2,
  //   });
  //   timeline.to("ul.transition li", {
  //     duration: 0.5,
  //     scaleY: 0,
  //     transformOrigin: "bottom left",
  //     stagger: 0.1,
  //     delay: 0.2,
  //   });
  // };

  // // define gsap contentAnimation
  // // this animation will cause DOM objects to fade in from an opacity of 0
  // const contentAnimation = () => {
  //   let timeline = gsap.timeline();
  //   timeline.from(".wrapper", { duration: 1, opacity: 0, delay: 0.1 });
  // };

  // // set delay function
  // const delay = (n) => {
  //   n = n || 2000;
  //   return new Promise((done) => {
  //     setTimeout(() => {
  //       done();
  //     }, n);
  //   });
  // };

  // barba init
  barba.init({
    sync: true,
    transitions: [
      {
        name: "opacity-transition",
        leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
          });
        },
        enter(data) {
          return gsap.from(data.next.container, {
            opacity: 0,
          });
        },
      },
    ],
  });
});
