import React, { PropTypes } from 'react'

const Markdown = ({ route }) => {
  const post = route.page.data

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  )
}

Markdown.propTypes = {
  route: PropTypes.object.isRequired
}

module.exports = Markdown
