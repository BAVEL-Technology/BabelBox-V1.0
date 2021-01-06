const bb = require('../api/index');

setInterval(() => {
  const portalID = {{ portal.id }};
const portal = bb.read('portal', { id: portalID });
if (portal.phase != waiting) {
  window.location.href = `/{{game.url}}/{{portal.code}}/answer`
}
}, 500
)
