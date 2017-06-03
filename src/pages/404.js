import React, { Component } from 'react'
import { func } from 'prop-types'
import Helmet from 'react-helmet'
import NotFoundContent from 'src/components/NotFoundContent'
import getPageTitle from 'src/utils/get-page-title'

class notFound extends Component {
  static propTypes = {
    notifyPageTransitionEnded: func.isRequired
  }

  componentWillUnmount () {
    this.props.notifyPageTransitionEnded()
  }

  render () {
    return (
      <div>
        <Helmet
          title={getPageTitle('404 Not Found')}
          meta={[
            { name: 'robots', content: 'noindex' }
          ]}
        />
        <NotFoundContent />
      </div>
    )
  }
}

export default notFound
exports.data = {
  path: '/404.html',
  skipLoader: true,
  hideHeader: true
}
