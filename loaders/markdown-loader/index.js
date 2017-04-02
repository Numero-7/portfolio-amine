const frontMatter = require('front-matter')
const markdownIt = require('markdown-it')

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})

module.exports = function (content) {
  this.cacheable()
  const meta = frontMatter(content)
  const body = md.render(meta.body)
  const result = Object.assign({}, meta.attributes, { body })
  this.value = result
  return `module.exports = ${JSON.stringify(result)}`
}
