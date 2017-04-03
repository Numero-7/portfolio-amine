import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import styles from './button.module.scss'

class SwagButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    external: PropTypes.bool
  }

  static defaultProps = {
    external: false
  }

  constructor () {
    super()
    this.rectLength = 448
    this.state = {
      dashOffset: `${this.rectLength}px`,
      dashArray: `${this.rectLength}px`
    }
  }

  startAnim () {
    this.setState({
      dashOffset: `${0}px`
    })
  }

  stopAnim () {
    this.setState({
      dashOffset: `${this.rectLength}px`
    })
  }

  createLinkProps () {
    const { href, external } = this.props

    return ({
      className: styles.link,
      [external ? 'href' : 'to']: prefixLink(href) || '#',
      target: external ? '_blank' : null,
      rel: external ? 'noopener noreferrer' : null
    })
  }

  render () {
    const { dashOffset, dashArray } = this.state
    const { text } = this.props

    return (
      <button
        className={styles.button}
        onMouseOver={() => this.startAnim()}
        onMouseLeave={() => this.stopAnim()}
      >
        <Link {...this.createLinkProps()}>
          <span className={styles.linkText}>{text}</span>
          <svg
            width="183"
            height="55"
            className={styles.rectanglesContainer}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="180"
              x="1.5"
              y="4.5"
              height="44"
              className={styles.greyBorders}
            />
            <rect
              width="172"
              height="52"
              x="4.5"
              y="1.5"
              className={styles.greyBorders}
              transform="rotate(180 91 27)"
            />
            <rect
              width="180"
              x="1.5"
              y="4.5"
              height="44"
              strokeDashoffset={dashOffset}
              strokeDasharray={dashArray}
              className={styles.whiteBorders}
            />
            <rect
              width="172"
              height="52"
              x="4.5"
              y="1.5"
              strokeDashoffset={dashOffset}
              strokeDasharray={dashArray}
              className={styles.whiteBorders}
              transform="rotate(180 91 27)"
            />
          </svg>
        </Link>
      </button>
    )
  }
}

export default SwagButton
