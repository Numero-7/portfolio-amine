import React, { Component } from 'react'
import { object, string, func } from 'prop-types'
import Helmet from 'react-helmet'
import TweenLite from 'gsap/TweenLite'
import { PAGE_FADE_DURATION } from 'src/values/animations'
import breakpoints from 'src/values/breakpoints'
import getPageTitle from 'src/utils/get-page-title'
import getAbsoluteURL from 'src/utils/get-absolute-url'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'

class About extends Component {
  static propTypes = {
    route: object.isRequired,
    previousPath: string.isRequired,
    transitionPage: func.isRequired,
    notifyPageTransitionEnded: func.isRequired
  }

  getInitialState () {
    return {
      contentOpacity: 1
    }
  }

  componentWillAppear (onComplete) {
    if (window.innerWidth >= breakpoints.desktop) {
      TweenLite.fromTo(
        this,
        PAGE_FADE_DURATION,
        { state: { contentOpacity: 0 } },
        { state: { contentOpacity: 1 }, onComplete }
      )
    } else {
      onComplete()
    }
  }

  componentWillEnter (onComplete) {
    this.props.transitionPage('in', onComplete)
  }

  componentWillLeave (onComplete) {
    this.props.transitionPage('out', onComplete, true)
  }

  componentWillUnmount () {
    this.props.notifyPageTransitionEnded()
  }

  render () {
    const { contentOpacity } = this.state
    const { route, previousPath } = this.props
    const columnPosition = 'right'
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

        <StretchedContainer
          pushed={false}
          paddingSide={columnPosition}
        >
          <div style={{ opacity: contentOpacity }}>
            <AboutContent />
          </div>

          <LinkColumn
            href={previousPath || '/'}
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
