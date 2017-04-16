import React, { Component, PropTypes } from 'react'
import TransitionGroup from 'preact-transition-group'
import Helmet from 'react-helmet'
import getPageTitle from 'src/utils/get-page-title'
import getChildrenPage from 'src/utils/get-children-page'
import getPagesAssets from 'src/utils/get-pages-assets'
import getProjectsData from 'src/utils/get-projects-data'
import passDataToChildren from 'src/utils/pass-data-to-children'
import isProjectPage from 'src/utils/is-project-page'
import Header from 'src/components/Header'
import Container from 'src/components/Container'
import Loader from 'src/components/Loader'

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
      previousPath: '',
      projectsData: getProjectsData(props.route.pages)
    }
  }

  componentWillReceiveProps () {
    // We store the previous path before it changes so that we can pass it down to the child page.
    this.setState({ previousPath: this.props.location.pathname })
  }

  render () {
    const { previousPath, assetsReady, projectsData } = this.state
    const { children, route } = this.props
    const childrenPage = getChildrenPage(children)
    const { skipLoader, hideHeader } = childrenPage.data

    return (
      <div>
        <Helmet title={getPageTitle()} />

        {!hideHeader && assetsReady && (
          <Header
            showCloseButton={isProjectPage(childrenPage)}
            previousPath={previousPath}
          />
        )}

        <Container>
          <TransitionGroup component="div">
            {(assetsReady || skipLoader)
              ? (
                passDataToChildren(children, {
                  previousPath,
                  projectsData,
                  key: childrenPage.path
                })
              )
              : (
                <Loader
                  assets={getPagesAssets(route.pages)}
                  onReady={() => this.setState({ assetsReady: true })}
                />
              )
            }
          </TransitionGroup>
        </Container>
      </div>
    )
  }
}

export default Template
