import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite } from 'gsap'
import getPageTitle from 'src/utils/get-page-title'
import getAbsoluteURL from 'src/utils/get-absolute-url'
import ZIndexLayer from 'src/components/ZIndexLayer'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import ProjectsGrid from 'src/components/ProjectsGrid'
import { contentPadding, projectsPageZIndex } from 'src/sass/variables/exports.module.scss'

class Projects extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    previousPath: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.animationTime = 2
    this.contentPadding = parseInt(contentPadding, 10)
    this.projectsPageZIndex = parseInt(projectsPageZIndex, 10)
  }

  componentWillAppear (callback) {
    // INITIAL RENDER ANIMATION GOES HERE
    callback(this) // (this = temporarily ignore eslint)
  }

  componentWillEnter (callback) {
    // SUBSEQUENT ENTER ANIMATIONS GO HERE
    if (this.props.previousPath === '/about/') {
      callback()
    } else {
      TweenLite.fromTo(
        this.root.base,
        this.animationTime,
        { x: parseInt(window.innerWidth, 10) - this.contentPadding },
        { x: 0, onComplete: callback }
      )
    }
  }

  componentWillLeave (callback) {
    // LEAVE ANIMATION GOES HERE
    if (this.aboutLinkClicked) {
      setTimeout(callback, this.animationTime * 1000)
    } else {
      TweenLite.fromTo(
        this.root.base,
        this.animationTime,
        { x: 0 },
        { x: parseInt(window.innerWidth, 10) - this.contentPadding, onComplete: callback }
      )
    }
  }

  render () {
    const { route, projectsData, previousPath } = this.props
    const currentURL = getAbsoluteURL(route.path)
    const pageTitle = getPageTitle('Projects')

    return (
      <ZIndexLayer
        ref={(component) => { this.root = component }}
        zIndex={this.projectsPageZIndex}
      >
        <Helmet
          title={pageTitle}
          meta={[
            { property: 'og:title', content: pageTitle },
            { property: 'og:url', content: currentURL }
          ]}
          link={[
            { rel: 'canonical', href: currentURL }
          ]}
        />

        <StretchedContainer>
          <LinkColumn
            text="Go back."
            href={(previousPath !== '/about/' && prefixLink(previousPath)) || prefixLink('/')}
          />

          <ProjectsGrid projects={projectsData} />

          <LinkColumn
            handleClick={() => { this.aboutLinkClicked = true }}
            text="About me."
            href={prefixLink('/about/')}
            pull="right"
          />
        </StretchedContainer>
      </ZIndexLayer>
    )
  }
}

export default Projects
