import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import getPageTitle from '../utils/get-page-title'

const HTML = ({ route }) => {
  const page = route.page.data

  return (
    <div>
      <Helmet
        title={getPageTitle(page.title)}
      />
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </div>
  )
}

HTML.propTypes = {
  route: PropTypes.object.isRequired
}

module.exports = HTML
