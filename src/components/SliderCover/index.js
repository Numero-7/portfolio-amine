import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite, TimelineLite, Power2 } from 'gsap'
import SwagButton from '../SwagButton'
import styles from './slider-cover.module.scss'

class SliderCover extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    handleProjectLinkClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.rectangles = {}
  }

  getInitialState () {
    return {
      imageOpacity: 0,
      infoOpacity: 0,
      rectangleStrokeDashoffset: `-${styles.projectCoverPerimeter}`,
      titleOpacity: 0,
      buttonIsVisible: false,
      buttonOpacity: 0
    }
  }

  componentDidMount () {
    this.timeline = this.getTimeline()
    this.animate()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.project.title !== nextProps.project.title) {
      this.setState(this.getInitialState(), () => { this.animate() })
    }
  }

  componentWillUnmount () {
    // Always clear the timeline to avoid multiple timelines running at the same time if coming back
    // to the page.
    this.timeline.clear()
    // Always undraw the white rectangle when unmounting the component. We use TweenLite instead of
    // manually setting the attribute so that it properly overrides TweenLite’s CSS.
    TweenLite.set(
      this.rectangles.white,
      { strokeDashoffset: `-${styles.projectCoverPerimeter}` }
    )
  }

  getTimeline () {
    // Create the timeline, paused by default, so that we can re-use the same timeline by restarting
    // it everytime we need it.
    const timeline = new TimelineLite({ paused: true })

    return (
      timeline
        .fromTo(this, 1, { state: { imageOpacity: 0 } }, { state: { imageOpacity: 1 } })
        .fromTo(this, 1, { state: { infoOpacity: 0 } }, { state: { infoOpacity: 1 } })
        .fromTo(
          this,
          2.5,
          { state: { rectangleStrokeDashoffset: `-${styles.projectCoverPerimeter}` } },
          { state: { rectangleStrokeDashoffset: 0, ease: Power2.easeOut } }
        )
        .fromTo(this, 1, { state: { titleOpacity: 0 } }, { state: { titleOpacity: 1 } })
        .set(this, { state: { buttonIsVisible: true } })
        .fromTo(this, 1, { state: { buttonOpacity: 0 } }, { state: { buttonOpacity: 1 } })
    )
  }

  animate () {
    this.timeline.restart()
  }

  render () {
    const {
      imageOpacity,
      infoOpacity,
      rectangleStrokeDashoffset,
      titleOpacity,
      buttonIsVisible,
      buttonOpacity
    } = this.state
    const { project, handleProjectLinkClick } = this.props
    const { shortTitle, type, title, path } = project

    return (
      <div>
        <div className={styles.rectangle}>
          <h1
            className={styles.title}
            style={{ opacity: titleOpacity }}
          >
            {shortTitle}
          </h1>

          <div
            className={styles.projectInfo}
            style={{ opacity: infoOpacity }}
          >
            <span className={styles.projectType}>{type}</span>
            <span className={styles.projectName}>{title}</span>
          </div>

          <div
            className={styles.projectImage}
            style={{
              backgroundImage: `url(${prefixLink(project.cover)})`,
              opacity: imageOpacity
            }}
          />

          <svg className={styles.svg}>
            <polyline
              ref={(component) => { this.rectangles.grey = component }}
              key="grey"
              className={styles.grey}
              strokeDashoffset={rectangleStrokeDashoffset}
              points="1,208 1,318 721,318 721,1 1,1 1,110"
            />

            <polyline
              ref={(component) => { this.rectangles.white = component }}
              key="white"
              className={styles.white}
              points="1,208 1,318 721,318 721,1 1,1 1,110"
            />
          </svg>
        </div>

        <div
          className={styles.buttonWrapper}
          style={{
            opacity: buttonOpacity,
            visibility: buttonIsVisible ? 'visible' : 'hidden'
          }}
        >
          <SwagButton
            handleClick={() => {
              handleProjectLinkClick(this.rectangles.white, styles.projectCoverPerimeter)
            }}
            href={prefixLink(path)}
            text="View project"
          />
        </div>
      </div>
    )
  }
}

export default SliderCover
