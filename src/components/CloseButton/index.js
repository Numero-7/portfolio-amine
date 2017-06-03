import React, { Component } from 'react'
import { string } from 'prop-types'
import Link from 'gatsby-link'
import TweenLite from 'gsap/TweenLite'
import { HOME_PAGE_LEAVE_DURATION } from '@values/animations'
import breakpoints from '@values/breakpoints'
import styles from './close-button.module.scss'

class CloseButton extends Component {
  static propTypes = {
    previousPath: string.isRequired,
    currentPath: string.isRequired
  }

  componentDidMount () {
    if (window.innerWidth >= breakpoints.desktop) {
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
  }

  render () {
    const { currentPath } = this.props

    return (
      <Link
        className={styles.link}
        to={currentPath === '/' ? '/about/' : '/'}
      >
        {currentPath === '/' ? 'About me.' : 'Close.'}
      </Link>
    )
  }
}

export default CloseButton
