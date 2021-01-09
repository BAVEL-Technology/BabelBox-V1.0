module.exports = {
  purge: {
    content: [
      './views/layouts/main.handlebars',
      './views/liarliar/answer.handlebars',
      './views/liarliar/game.handlebars',
      './views/liarliar/question.handlebars',
      './views/liarliar/waiting.handlebars',
      './views/partials/liarliar/create-portal-card.handlebars',
      './views/partials/liarliar/create-user-card.handlebars',
      './views/partials/liarliar/enter-portal-card.handlebars',
      './views/partials/liarliar/portal-card.handlebars',
      './views/partials/liarliar/timer-script.handlebars',
      './views/partials/liarliar/user-card.handlebars',
      './views/partials/liarliar/how-to-play-card.handlebars',
      './views/partials/footer.handlebars',
      './views/partials/game-card.handlebars',
      './views/partials/hero-title.handlebars',
      './views/partials/nav.handlebars',
      './views/partials/tiny-logo.handlebars',
      './views/about-us.handlebars',
      './views/games.handlebars',
      './views/hero.handlebars',
      './public/js/liarliar/index.js',
      './public/js/index.js'
    ],
    options: {
      safelist: [
        'bg-green-500',
        'bg-red-500',
        'z-50',
        '-translate-y-36',
        'translate-y-36',
        'duration-500',
        '-top-24',
        'bg-indigo-600',
        'bg-pink-600'
      ],
    }
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
