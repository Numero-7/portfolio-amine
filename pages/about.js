import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite } from 'gsap'
import getPageTitle from 'src/utils/get-page-title'
import getCurrentURL from 'src/utils/get-current-url'
import ZIndexLayer from 'src/components/ZIndexLayer'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'
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
    // INITIAL RENDER ANIMATION GOES HERE
    callback(this) // (this = temporarily ignore eslint)
  }

  componentWillEnter (callback) {
    // SUBSEQUENT ENTER ANIMATIONS GO HERE
    const { previousPath } = this.props
    const initialPosition = (
      previousPath === '/projects/'
        ? parseInt(window.innerWidth, 10) - this.contentPadding
        : parseInt(-window.innerWidth, 10) + this.contentPadding
    )

    TweenLite.fromTo(
      this.root.base,
      this.animationTime,
      { x: initialPosition },
      { x: 0, onComplete: callback }
    )
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
    const currentURL = getCurrentURL(route)
    const pageTitle = getPageTitle('About')

    return (
      <ZIndexLayer
        ref={(component) => { this.root = component }}
        zIndex={this.aboutPageZIndex}
      >
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

        <StretchedContainer
          pushed={false}
          paddingSide={columnPosition}
        >
          <AboutContent />

          <LinkColumn
            href={prefixLink(previousPath) || prefixLink('/')}
            text="Close."
            pull={columnPosition}
          />
        </StretchedContainer>
      </ZIndexLayer>
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
