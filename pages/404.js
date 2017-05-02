import React from 'react'
import Helmet from 'react-helmet'
import getPageTitle from 'src/utils/get-page-title'

const notFound = () => (
  <div>
    <Helmet
      title={getPageTitle('404 Not Found')}
      meta={[
        { name: 'robots', content: 'noindex' }
      ]}
    />
    <h1>404 not found.</h1>
  </div>
)

export default notFound
exports.data = {
  path: '/404.html',
  skipLoader: true
}
