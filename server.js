const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const resolve = file => path.resolve(__dirname, file)
const compression = require('compression')
const http = require('http');
const API = require('request');

// const isProd = process.env.NODE_ENV === 'production'
const isProd = true
// const isProd = false
const app = express()

//尽量在其他中间件前使用compression
app.use(compression());
let renderer
if (isProd) {
  // In production: create server renderer using server bundle and index HTML
  // template from real fs.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require('./dister/vue-ssr-bundle.json')
  // src/index.template.html is processed by html-webpack-plugin to inject
  // build assets and output as dist/index.html.
  const template = fs.readFileSync(resolve('./dister/index.html'), 'utf-8')
  renderer = createRenderer(bundle, template)
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  require('./build/dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
}

function createRenderer (bundle, template) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  // maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
  maxAge: 60 * 60 * 24 * 30
})


app.use('/dister', serve('./dister', true))
app.use('/service-worker.js', serve('./dister/service-worker.js'))
app.use('/src/assets/js/swiper.min.js', serve('./src/assets/js/swiper.min.js'))
app.use('/src/assets/image/favicon.ico', serve('./src/assets/image/favicon.ico'))
app.use('/src/assets/', serve('./src/assets/'))
app.use('/MP_verify_XvpMPNigMWz3yqY1.txt', serve('./MP_verify_XvpMPNigMWz3yqY1.txt'))


app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  const s = Date.now()

  res.setHeader("Content-Type", "text/html")

  const errorHandler = err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }

  renderer.renderToStream({ url: req.url ,title:global.title})
    .on('error', errorHandler)
    .on('end', (res) => {
      console.log(`whole request: ${Date.now() - s}ms`)
        console.log(1, res);
    })
    .pipe(res)
})

// const port = process.env.PORT || 9200
const port = process.env.PORT || 9012  //测试
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})