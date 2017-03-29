const frontMatter = require('front-matter')
const markdownIt = require('markdown-it')
const objectAssign = require('object-assign')

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-attrs'))

module.exports = function (content) {
  this.cacheable()
  const meta = frontMatter(content)
  const body = md.render(meta.body)
  const result = objectAssign({}, meta.attributes, { body })
  this.value = result
  return `module.exports = ${JSON.stringify(result)}`
}
