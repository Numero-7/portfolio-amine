import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import getPageTitle from 'src/utils/get-page-title'
import getChildrenPageData from 'src/utils/get-children-page-data'
import getPagesAssets from 'src/utils/get-pages-assets'
import Loader from 'src/components/Loader'

// Inject global styles.
import 'src/sass/vendors/_normalize.scss'
import 'src/sass/base/_root.scss'

class Template extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    route: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { assetsReady: false }
  }

  render () {
    const { children, route } = this.props
    const { skipLoader } = getChildrenPageData(children)

    return (
      <div>
        <Helmet
          title={getPageTitle()}
        />

        { this.state.assetsReady || skipLoader
          ? children
          : (
            <Loader
              assets={getPagesAssets(route.pages)}
              onReady={() => this.setState({ assetsReady: true })}
            />
          )
        }
      </div>
    )
  }
}

export default Template
