import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite } from 'gsap'
import fadeElement from 'src/utils/fade-element'
import getPageTitle from 'src/utils/get-page-title'
import getAbsoluteURL from 'src/utils/get-absolute-url'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'
import PageTransitionLayer from 'src/components/PageTransitionLayer'

class About extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    previousPath: PropTypes.string.isRequired,
    handlePageTransitionEnd: PropTypes.func.isRequired
  }

  componentWillAppear (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.content.base, timeline, {})
  }

  componentWillEnter (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    this.transitionLayer.animateIn(timeline)
  }

  componentWillLeave (onComplete) {
    onComplete(this) // this = ignore eslint
  }

  componentWillUnmount () {
    this.props.handlePageTransitionEnd(true)
  }

  render () {
    const { route, previousPath } = this.props
    const columnPosition = (previousPath === '/projects/' ? 'left' : 'right')
    const currentURL = getAbsoluteURL(route.path)
    const pageTitle = getPageTitle('About')

    return (
      <div>
        <Helmet
          title={pageTitle}
          link={[
            { rel: 'canonical', href: currentURL }
          ]}
          meta={[
            { property: 'og:title', content: pageTitle },
            { property: 'og:url', content: currentURL }
          ]}
        />

        <PageTransitionLayer ref={(component) => { this.transitionLayer = component }} />

        <StretchedContainer
          pushed={false}
          paddingSide={columnPosition}
        >
          <AboutContent ref={(component) => { this.content = component }} />

          <LinkColumn
            href={prefixLink(previousPath) || prefixLink('/')}
            text="Close."
            pull={columnPosition}
          />
        </StretchedContainer>
      </div>
    )
  }
}

export default About
exports.data = {
  hideHeader: true,
  assets: [
    '/static/images/about-picture.png'
  ]
}
