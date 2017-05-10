import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import TransitionGroup from 'preact-transition-group'
import { config } from 'config'
import 'gsap-react-plugin' // Allow GSAP to tween components’ state.
import getPageTitle from 'src/utils/get-page-title'
import getAbsoluteURL from 'src/utils/get-absolute-url'
import getChildrenPage from 'src/utils/get-children-page'
import getPagesAssets from 'src/utils/get-pages-assets'
import getProjectsData from 'src/utils/get-projects-data'
import passDataToChildren from 'src/utils/pass-data-to-children'
import isProjectPage from 'src/utils/is-project-page'
import Header from 'src/components/Header'
import Container from 'src/components/Container'
import Loader from 'src/components/Loader'
import PageTransitionLayer from 'src/components/PageTransitionLayer'

// Inject global styles.
import 'src/sass/vendors/_reset.scss'
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
      projectsData: getProjectsData(props.route.pages),
      previousPath: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        // We store the previous path before it changes so that we can pass it down to the children.
        previousPath: this.props.location.pathname
      })
    }
  }

  render () {
    const { assetsReady, projectsData, previousPath } = this.state
    const { children, route } = this.props
    const childrenPage = getChildrenPage(children)
    const { skipLoader, hideHeader } = childrenPage.data
    const currentURL = getAbsoluteURL(route.path)
    const pageTitle = getPageTitle()

    return (
      <div>
        <Helmet
          title={pageTitle}
          link={[
            { rel: 'canonical', href: currentURL }
          ]}
          meta={[
            { name: 'description', content: config.siteDescription },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: config.siteDescription },
            { property: 'og:url', content: currentURL }
          ]}
        />

        {!hideHeader && assetsReady && (
          <Header
            previousPath={previousPath}
            showCloseButton={isProjectPage(childrenPage)}
          />
        )}

        <Container>
          {(assetsReady || skipLoader)
            ? (
              <div>
                <PageTransitionLayer ref={(component) => { this.transitionLayer = component }} />
                <TransitionGroup component="div">
                  {passDataToChildren(children, {
                    projectsData,
                    previousPath,
                    triggerPageTransition:
                    (onComplete, reverse) => this.transitionLayer.animate(onComplete, reverse),
                    // Add a unique key on the children page so that TransitionGroup works.
                    key: childrenPage.path
                  })}
                </TransitionGroup>
              </div>
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
