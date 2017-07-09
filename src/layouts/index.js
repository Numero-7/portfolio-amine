import React, { Component } from 'react'
import { node, object, string } from 'prop-types'
import Helmet from 'react-helmet'
import TransitionGroup from 'preact-transition-group'
import '@utils/browser/gsap-react-plugin'
import throttle from 'lodash/throttle'
import breakpoints from '@values/breakpoints'
import getPageTitle from '@utils/get-page-title'
import getAbsoluteURL from '@utils/get-absolute-url'
import getChildrenPage from '@utils/get-children-page'
import getPagesAssets from '@utils/get-pages-assets'
import getProjectsData from '@utils/get-projects-data'
import passDataToChildren from '@utils/pass-data-to-children'
import isProjectPage from '@utils/is-project-page'
import Header from '@components/Header'
import Container from '@components/Container'
import Loader from '@components/Loader'
import PageTransitionLayer from '@components/PageTransitionLayer'

// Inject global styles.
import '@sass/vendors/_reset.scss'
import '@sass/base/_root.scss'

class DefaultLayout extends Component {
  static propTypes = {
    children: node.isRequired,
    route: object.isRequired,
    location: object.isRequired,
    siteDescription: string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
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
    const { children, route, siteDescription } = this.props
    const childrenComponent = children()
    const childrenPage = getChildrenPage(childrenComponent)
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
            { name: 'description', content: siteDescription },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: siteDescription },
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
                    passDataToChildren(childrenComponent, {
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

export default DefaultLayout
export const siteDescriptionQuery = `
  query siteMetaData {
    site {
      siteMetadata {
        siteDescription
      }
    }
  }
`
