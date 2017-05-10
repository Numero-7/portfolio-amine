import React, { Component, PropTypes } from 'react'
import { TweenLite } from 'gsap'
import { Link } from 'react-router'
import { HOME_PAGE_LEAVE_DURATION } from 'src/values/animations'
import styles from './close-button.module.scss'

class CloseButton extends Component {
  static propTypes = {
    previousPath: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }

  componentDidMount () {
    const { previousPath } = this.props
    const delay = (previousPath === '/' ? HOME_PAGE_LEAVE_DURATION : 0)

    TweenLite.fromTo(
      this.base,
      1,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        delay
      }
    )
  }

  render () {
    const { href } = this.props

    return (
      <Link
        className={styles.link}
        to={href}
      >
        Close.
      </Link>
    )
  }
}

export default CloseButton
