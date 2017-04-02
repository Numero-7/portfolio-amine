import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import getPageTitle from 'src/utils/get-page-title'
import getChildrenPageData from 'src/utils/get-children-page-data'
import Loader from 'src/components/Loader'

// Inject global styles.
import 'src/sass/vendors/_normalize.scss'
import 'src/sass/base/_root.scss'

class Template extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { assetsReady: false }
  }

  render () {
    const { children } = this.props
    const { skipLoader } = getChildrenPageData(children)

    return (
      <div>
        <Helmet
          title={getPageTitle()}
        />

        { this.state.assetsReady || skipLoader
          ? children
          : <Loader onReady={() => this.setState({ assetsReady: true })} />
        }
      </div>
    )
  }
}

export default Template
