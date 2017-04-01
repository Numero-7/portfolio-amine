import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import getPageTitle from 'src/utils/get-page-title'
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
    return (
      <div>
        <Helmet
          title={getPageTitle()}
        />

        { this.state.assetsReady
          ? this.props.children
          : <Loader onReady={() => this.setState({ assetsReady: true })} />
        }
      </div>
    )
  }
}

export default Template
