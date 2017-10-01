const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const filesize = require('rollup-plugin-filesize')
const license = require('rollup-plugin-license')

const targets = {
  umd: 'dist/hljModal.js',
  min: 'dist/hljModal.min.js'
}

function build(format) {
  const defaultPlugins = [
    license({
      banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= moment().format("YYYY-MM-DD") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= moment().format("YYYY") %> <%= pkg.author %>;' +
        ' Licensed <%= pkg.license %> */\n\n'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    filesize()
  ]
  
  const inputOptions = {
    input: 'src/Modal.js',
    plugins: format === 'min' ? defaultPlugins.concat(
      uglify({
        output: {
          comments: true
        }
      })
    ) : defaultPlugins
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
  }
  catch(err) {
    console.log(err)
  }
})()

