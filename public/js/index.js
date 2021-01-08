/*
 * Parse DOM for twemojis
 * use npm twemoji to convert from emoji to twemoij
 */
twemoji.parse(document.body);

// ====================================================
// GSAP AND BARBA PAGE TRANSITION ANIMATION PROPERTIES
// // ====================================================
// $(document).ready(function () {
//   // basic barba/gsap page transition animation
//   barba.init({
//     sync: true,
//     transitions: [
//       {
//         name: "opacity-transition",
//         leave(data) {
//           return gsap.to(data.current.container, {
//             opacity: 0,
//           });
//         },
//         enter(data) {
//           return gsap.from(data.next.container, {
//             opacity: 0,
//           });
//         },
//       },
//     ],
//   });
// });