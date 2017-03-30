import React, { Component, PropTypes } from 'react'
import Loader from '../components/Loader'
// Directly inject the font-face CSS for the two fonts shown on the loading screen.
// The rest of the fonts will be loaded with other assets.
import '../static/css/base64-fonts.css'
// Inject other global styles.
import '../static/sass/vendors/_normalize.scss'
import '../static/sass/base/_root.scss'

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
        { this.state.assetsReady
          ? (
            <div>
              {this.props.children}
            </div>
          )
          : <Loader onReady={() => this.setState({ assetsReady: true })} />
        }
      </div>
    )
  }
}

export default Template
