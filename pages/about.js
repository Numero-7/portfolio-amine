import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite } from 'gsap'
import PositionLayer from 'src/components/PositionLayer'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'

class About extends Component {
  static propTypes = {
    previousPath: PropTypes.string.isRequired,
    pageZIndex: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)
    this.animationTime = 2
  }

  componentWillEnter (callback) {
    TweenLite.fromTo(
      this.root.base,
      this.animationTime,
      { x: -window.innerWidth },
      { x: 0, onComplete: callback }
    )
  }

  componentWillLeave (callback) {
    TweenLite.fromTo(
      this.root.base,
      this.animationTime,
      { x: 0 },
      { x: -window.innerWidth, onComplete: callback }
    )
  }

  render () {
    const { previousPath, pageZIndex } = this.props
    const columnPosition = (previousPath === '/projects/' ? 'left' : 'right')

    return (
      <PositionLayer
        ref={(component) => { this.root = component }}
        zIndex={pageZIndex}
      >
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
      </PositionLayer>
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
