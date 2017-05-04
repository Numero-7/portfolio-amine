import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite, Power2 } from 'gsap'
import { projectCoverPerimeter } from 'src/sass/variables/exports.module.scss'
import Smoke from '../Smoke'
import SwagButton from '../SwagButton'
import styles from './slider-cover.module.scss'

class SliderCover extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    handleProjectClicked: PropTypes.func.isRequired,
    onAnimationComplete: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.rectangles = {}
  }

  componentDidMount () {
    this.animate()
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.project.title !== this.props.project.title
  }

  componentDidUpdate () {
    this.animate()
  }

  animate () {
    const { onAnimationComplete } = this.props
    const invisible = { autoAlpha: 0 }
    const visible = { autoAlpha: 1 }
    const tl = new TimelineLite({
      onComplete: () => onAnimationComplete(false)
    })

    tl
      .fromTo(this.image, 1, invisible, visible)
      .fromTo(this.info, 1, invisible, visible)
      .fromTo(
        this.rectangles.grey,
        2.5,
        { strokeDashoffset: `-${projectCoverPerimeter}` },
        { strokeDashoffset: 0, ease: Power2.easeOut }
      )
      .fromTo(this.title, 1, invisible, visible)
      .fromTo(this.button, 1, invisible, visible)
  }

  handleProjectClicked (active) {
    // Hacky way to detect if the user is leaving the page by clicking on the Swagbutton, used in
    // the `componentWillLeave` method for the page leave animation.
    // We simply set a flag depending on if the user hovers/focuses or leaves/blurs the link.
    this.props.handleProjectClicked(active, this.rectangles.white)
  }

  render () {
    const { project } = this.props
    const { shortTitle, type, title, path } = project

    return (
      <div>
        <div className={styles.rectangle}>
          <h1
            ref={(component) => { this.title = component }}
            className={styles.title}
          >
            {shortTitle}
          </h1>

          <div
            ref={(component) => { this.info = component }}
            className={styles.projectInfo}
          >
            <span className={styles.projectType}>{type}</span>
            <span className={styles.projectName}>{title}</span>
          </div>

          <div
            ref={(component) => { this.image = component }}
            className={styles.projectImage}
            style={{ backgroundImage: `url(${project.cover})` }}
          />

          <svg className={styles.svg}>
            {['grey', 'white'].map(lineColor => (
              <polyline
                ref={(component) => { this.rectangles[lineColor] = component }}
                key={lineColor}
                className={styles[lineColor]}
                points="1,208 1,318 721,318 721,1 1,1 1,110"
              />
            ))}
          </svg>

          <Smoke />
        </div>

        <div
          ref={(component) => { this.button = component }}
          className={styles.buttonWrapper}
          onMouseOver={() => this.handleProjectClicked(true)}
          onFocus={() => this.handleProjectClicked(true)}
          onMouseLeave={() => this.handleProjectClicked(false)}
          onBlur={() => this.handleProjectClicked(false)}
        >
          <SwagButton
            href={prefixLink(path)}
            text="View project"
          />
        </div>
      </div>
    )
  }
}

export default SliderCover
