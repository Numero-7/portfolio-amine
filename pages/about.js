import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite, TweenLite } from 'gsap'
import fadeElement from 'src/utils/fade-element'
import getPageTitle from 'src/utils/get-page-title'
import getAbsoluteURL from 'src/utils/get-absolute-url'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'
import PageTransitionLayer from 'src/components/PageTransitionLayer'
import { contentPadding, aboutPageZIndex } from 'src/sass/variables/exports.module.scss'

class About extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    previousPath: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.animationTime = 2
    this.contentPadding = parseInt(contentPadding, 10)
    this.aboutPageZIndex = parseInt(aboutPageZIndex, 10)
  }

  componentWillAppear (callback) {
    const timeline = new TimelineLite({ onComplete: callback })
    fadeElement(this.content.base, timeline, {})
  }

  componentWillEnter (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.column, timeline, { duration: 0, fadeOut: true })
    this.transitionLayer.animateLayer(timeline, () => {
      fadeElement(this.column, timeline, { duration: 0 })
    })
  }

  componentWillLeave (callback) {
    // LEAVE ANIMATION GOES HERE
    const { previousPath } = this.props
    const initialPosition = (
      previousPath === '/projects/'
      ? parseInt(window.innerWidth, 10) - this.contentPadding
      : parseInt(-window.innerWidth, 10) + this.contentPadding
    )

    TweenLite.fromTo(
      this.root.base,
      this.animationTime,
      { x: 0 },
      { x: initialPosition, onComplete: callback }
    )
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
            ref={(component) => { this.column = component.base }}
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
