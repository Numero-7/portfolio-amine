import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite } from 'gsap'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'

class About extends Component {
  static propTypes = {
    key: PropTypes.string.isRequired,
    previousPath: PropTypes.string.isRequired
  }

  componentWillEnter (callback) {
    TweenLite.fromTo(
      this.root.base,
      10,
      { x: -window.innerWidth },
      { x: 0, onComplete: callback }
    )
  }

  componentWillLeave (callback) {
    TweenLite.fromTo(
      this.root.base,
      10,
      { x: 0 },
      { x: -window.innerWidth, onComplete: callback }
    )
  }

  render () {
    const { key, previousPath } = this.props
    const columnPosition = (previousPath === '/projects/' ? 'left' : 'right')

    return (
      <StretchedContainer
        key={key}
        ref={(component) => { this.root = component }}
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
