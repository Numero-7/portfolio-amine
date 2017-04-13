import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import styles from './swag-button.module.scss'

class SwagButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    external: PropTypes.bool
  }

  static defaultProps = {
    external: false,
    href: '#'
  }

  constructor (props) {
    super(props)

    this.rectLength =
      `${(parseInt(styles.buttonWidth, 10) * 2) + (parseInt(styles.buttonHeight, 10) * 2)}px`
    this.state = { dashOffset: this.rectLength }
  }

  createLinkProps () {
    const { href, external } = this.props

    return ({
      [external ? 'href' : 'to']: prefixLink(href) || '#',
      target: external ? '_blank' : null,
      rel: external ? 'noopener noreferrer' : null
    })
  }

  handleActive () {
    this.setState({ dashOffset: '0px' })
  }

  handleLeave () {
    this.setState({ dashOffset: this.rectLength })
  }

  render () {
    const { dashOffset } = this.state
    const { text } = this.props

    return (
      <Link
        className={styles.root}
        {...this.createLinkProps()}
        onMouseOver={() => this.handleActive()}
        onFocus={() => this.handleActive()}
        onMouseLeave={() => this.handleLeave()}
        onBlur={() => this.handleLeave()}
      >
        <span className={styles.text}>{text}</span>

        <svg
          className={styles.rectanglesContainer}
          width={styles.buttonWidth}
          height={styles.buttonHeight}
        >
          <rect
            className={styles.greyBorders}
            width="180"
            height="44"
            x="1.5"
            y="4.5"
          />

          <rect
            className={styles.greyBorders}
            width="172"
            height="52"
            x="4.5"
            y="1.5"
            transform="rotate(180 91 27)"
          />

          <rect
            className={styles.whiteBorders}
            width="180"
            height="44"
            x="1.5"
            y="4.5"
            strokeDashoffset={dashOffset}
            strokeDasharray={this.rectLength}
          />

          <rect
            className={styles.whiteBorders}
            width="172"
            height="52"
            x="4.5"
            y="1.5"
            strokeDashoffset={dashOffset}
            strokeDasharray={this.rectLength}
            transform="rotate(180 91 27)"
          />
        </svg>
      </Link>
    )
  }
}

export default SwagButton
