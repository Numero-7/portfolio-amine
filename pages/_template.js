import React, {
  Component,
  Children,
  cloneElement,
  PropTypes
} from 'react'
import Helmet from 'react-helmet'
import getPageTitle from 'src/utils/get-page-title'
import getChildrenPageData from 'src/utils/get-children-page-data'
import getPagesAssets from 'src/utils/get-pages-assets'
import Container from 'src/components/Container'
import Loader from 'src/components/Loader'

// Inject global styles.
import 'src/sass/vendors/_normalize.scss'
import 'src/sass/base/_root.scss'

class Template extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      assetsReady: false,
      previousPath: ''
    }
  }

  componentWillReceiveProps () {
    // We store the previous path before it changes so that we can pass it down to the child page.
    this.setState({ previousPath: this.props.location.pathname })
  }

  render () {
    const { previousPath, assetsReady } = this.state
    const { children, route } = this.props
    const { skipLoader } = getChildrenPageData(children)

    return (
      <div>
        <Helmet
          title={getPageTitle()}
        />

        <Container>
          { assetsReady || skipLoader
            ? (
              Children.map(
                children,
                child => cloneElement(child, { previousPath })
              )
            )
            : (
              <Loader
                assets={getPagesAssets(route.pages)}
                onReady={() => this.setState({ assetsReady: true })}
              />
            )
          }
        </Container>
      </div>
    )
  }
}

export default Template
