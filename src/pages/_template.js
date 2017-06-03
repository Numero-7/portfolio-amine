import React, { Component } from 'react'
import { node, object } from 'prop-types'
import Helmet from 'react-helmet'
import { config } from 'config'
import TransitionGroup from 'preact-transition-group'
import 'src/utils/browser/gsap-react-plugin'
import throttle from 'lodash/throttle'
import breakpoints from 'src/values/breakpoints'
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
    children: node.isRequired,
    route: object.isRequired,
    location: object.isRequired
  }

  getInitialState () {
    return {
      assetsReady: false,
      transitionEnded: true,
      previousPath: ''
    }
  }

  componentWillMount () {
    if (typeof window !== 'undefined') {
      this.setState({
        isMobile: window.innerWidth < breakpoints.desktop,
        projectsData: getProjectsData(this.props.route.pages)
      })

      window.addEventListener('resize', throttle(() => (
        this.setState({ isMobile: window.innerWidth < breakpoints.desktop })
      ), 500))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        // We store the previous path before it changes so that we can pass it down to the children.
        previousPath: this.props.location.pathname,
        // Flag needed to wait for the end of the old page’s exit transition before rendering the
        // new child.
        transitionEnded: window.innerWidth < breakpoints.desktop
      })
    }
  }

  render () {
    const { isMobile, assetsReady, projectsData, previousPath, transitionEnded } = this.state
    const { children, route } = this.props
    const childrenPage = getChildrenPage(children)
    const { skipLoader, hideHeader } = childrenPage.data
    const currentURL = getAbsoluteURL(route.path)
    const pageTitle = getPageTitle()

    const showHeader = (
      ((transitionEnded || previousPath !== '/about/') && !hideHeader && assetsReady)
      || (isMobile && assetsReady)
    )

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

        {showHeader && (
          <Header
            previousPath={previousPath}
            currentPath={childrenPage.path}
            showCloseButton={isProjectPage(childrenPage) || isMobile}
          />
        )}

        <Container>
          {(assetsReady || skipLoader)
            ? (
              <div>
                <PageTransitionLayer ref={(component) => { this.transitionLayer = component }} />
                <TransitionGroup component="div">
                  {transitionEnded && (
                    passDataToChildren(children, {
                      projectsData,
                      previousPath,
                      isMobile,
                      notifyPageTransitionEnded: () => this.setState({ transitionEnded: true }),
                      transitionPage: (direction, onComplete, reverse) =>
                        this.transitionLayer.animate(direction, onComplete, reverse),
                      // Add a unique key on the children page so that TransitionGroup works.
                      key: childrenPage.path
                    })
                  )}
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
