import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import styles from './button.module.scss'

class SwagButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    externalLink: PropTypes.bool
  }

  static defaultProps = {
    externalLink: false
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

  render () {
    const { text, href, externalLink } = this.props

    return (
      <button
        className={styles.button}
        onMouseOver={() => this.startAnim()}
        onMouseLeave={() => this.stopAnim()}
      >
        <Link
          to={prefixLink(href)}
          className={styles.link}
          target={externalLink ? '_blank' : ''}
        >
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
              strokeDashoffset={this.state.dashOffset}
              strokeDasharray={this.state.dashArray}
              className={styles.whiteBorders}
            />
            <rect
              width="172"
              height="52"
              x="4.5"
              y="1.5"
              strokeDashoffset={this.state.dashOffset}
              strokeDasharray={this.state.dashArray}
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
