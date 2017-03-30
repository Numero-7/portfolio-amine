import React, { Component, PropTypes } from 'react'
import { Container } from 'react-responsive-grid'
import { rhythm } from '../utils/typography'
import Loader from '../components/Loader'

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
            <Container
              style={{
                maxWidth: '100%',
                padding: `${rhythm(0.5)} ${rhythm(1)}`
              }}
            >
              {this.props.children}
            </Container>
          )
          : <Loader onReady={() => this.setState({ assetsReady: true })} />
        }
      </div>
    )
  }
}

export default Template
