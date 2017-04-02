import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import getPageTitle from 'src/utils/get-page-title'

const MD = ({ route }) => {
  const post = route.page.data

  return (
    <div>
      <Helmet
        title={getPageTitle(post.title)}
      />

      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  )
}

MD.propTypes = {
  route: PropTypes.object.isRequired
}

module.exports = MD
