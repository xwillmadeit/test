const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const filesize = require('rollup-plugin-filesize')
const license = require('rollup-plugin-license')
const postcss = require('rollup-plugin-postcss')
const cssnano = require('cssnano')

const targets = {
  umd: 'dist/js/hljModal.js',
  min: 'dist/js/hljModal.min.js'
}

const getPostcssPlugin = format => {
  const postcssPluginList = [
    require('autoprefixer')({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
    })
  ]

  if (format === 'min') {
    postcssPluginList.push(cssnano())
  }

  const postcssPlugin = postcss({
    plugins: postcssPluginList,
    extract:
      format === 'min' ? 'dist/css/hljModal.min.css' : 'dist/css/hljModal.css',
    extensions: ['.css']
  })

  return postcssPlugin
}

function build(format) {
  const uglifyPlugin = uglify()
  const postcssPlugin = getPostcssPlugin(format)

  const defaultPlugins = [
    license({
      banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= moment().format("YYYY-MM-DD") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= moment().format("YYYY") %> <%= pkg.author %>;' +
        ' Licensed <%= pkg.license %> */\n\n'
    }),
    postcssPlugin,
    babel({
      exclude: 'node_modules/**'
    }),
    filesize()
  ]

  const inputOptions = {
    input: 'src/Modal.js',
    plugins:
      format === 'min' ? defaultPlugins.concat(uglifyPlugin) : defaultPlugins
  }

  return rollup(inputOptions).then(bundle => {
    bundle.write({
      file: targets[format],
      format: 'umd',
      name: 'HljModal'
    })
  })
}

;(async () => {
  try {
    await Promise.all([build('umd'), build('min')])
  } catch (err) {
    console.log(err)
  }
})()
