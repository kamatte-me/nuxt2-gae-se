const app = require('express')()
const { Nuxt, Builder } = require('nuxt')

const isProd = (process.env.NODE_ENV === 'production')
const PORT = isProd ? 8080 : 3000

// We instantiate nuxt.js with the options
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js
app.use(nuxt.render)

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen)
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
else {
  listen()
}

function listen() {
  // Listen the app
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
