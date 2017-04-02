import React, {Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import styles from './button.module.scss'

class SwagButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    externalLink: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    this.longRectangle
    this.longLength
    this.largeRectangle
    this.largeLength
  }

  componentDidMount () {
    this.longRectangle  = document.querySelector('.js-long')
    this.longLength     = this.getRectLength(this.longRectangle)
    this.longRectangle.style.strokeDashoffset = this.longLength + 'px'
    this.longRectangle.style.strokeDasharray = this.longLength + 'px'

    this.largeRectangle = document.querySelector('.js-large')
    this.largeLength    = this.getRectLength(this.largeRectangle)
    this.largeRectangle.style.strokeDashoffset = this.largeLength + 'px'
    this.largeRectangle.style.strokeDasharray = this.largeLength + 'px'
  }

  getRectLength (el) {
    const width  = el.getAttribute('width')
    const height = el.getAttribute('height')

    return (width * 2) + (height * 2)
  }

  startAnim () {
    this.longRectangle.style.strokeDashoffset = 0 + 'px'
    this.largeRectangle.style.strokeDashoffset = 0 + 'px'
  }

  stopAnim () {
    this.longRectangle.style.strokeDashoffset = this.longLength + 'px'
    this.largeRectangle.style.strokeDashoffset = this.largeLength + 'px'
  }

  render () {

    const { text, link, externalLink } = this.props

    return (
      <button className={styles.button} onMouseOver={this.startAnim.bind(this)} onMouseLeave={this.stopAnim.bind(this)}>
        <Link 
          to={prefixLink(link)} 
          className={styles.link}
          target={externalLink ? "_blank" : ""}>
          <span className={styles.linkText}>{text}</span>
          <svg width="183" height="55" className={styles.rectanglesContainer} xmlns="http://www.w3.org/2000/svg">
            <rect width="180" x="1.5" y="4.5" height="44" className={styles.greyBorders} />
            <rect width="172" height="52" x="4.5" y="1.5" className={styles.greyBorders} transform="rotate(180 91 27)" />
            <rect width="180" x="1.5" y="4.5" height="44" className={`${styles.whiteBorders} js-long`}/>
            <rect width="172" height="52" x="4.5" y="1.5" className={`${styles.whiteBorders} js-large`} transform="rotate(180 91 27)" />
          </svg>
        </Link>
      </button>
    )
  }
}

export default SwagButton