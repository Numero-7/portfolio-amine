import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite, Power2 } from 'gsap'
import {
  PAGE_FADE_DURATION,
  HOME_PAGE_COVER_FILL_DURATION
} from 'src/values/animations'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import Slider from 'src/components/Slider'
import { projectCoverPerimeter } from 'src/sass/variables/exports.module.scss'

class Index extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  componentWillAppear (callback) {
    const timeline = new TimelineLite({ onComplete: callback })
    this.fadeSlider(timeline)
  }

  componentWillEnter (callback) {
    const timeline = new TimelineLite({
      delay: PAGE_FADE_DURATION,
      onComplete: callback
    })
    this.fadeSlider(timeline)
  }

  componentWillLeave (callback) {
    const timeline = new TimelineLite({ onComplete: callback })

    if (this.projectLinkClicked) {
      timeline.fromTo(
        this.projectCover,
        HOME_PAGE_COVER_FILL_DURATION,
        { strokeDashoffset: `-${projectCoverPerimeter}` },
        { strokeDashoffset: 0, ease: Power2.easeOut }
      )

      this.fadeSlider(timeline, true)
    }
  }

  fadeSlider (timeline, fadeOut) {
    const invisible = { autoAlpha: 0 }
    const visible = { autoAlpha: 1 }

    timeline.fromTo(
      this.slider.base,
      PAGE_FADE_DURATION,
      fadeOut ? visible : invisible,
      fadeOut ? invisible : visible
    )
  }

  render () {
    const { projectsData } = this.props

    return (
      <StretchedContainer>
        <Helmet
          htmlAttributes={{
            class: 'unscrollable'
          }}
        />

        <LinkColumn
          href={prefixLink('/about/')}
          text="About me."
        />

        <Slider
          ref={(component) => { this.slider = component }}
          projectsData={projectsData}
          handleProjectLinkClick={(projectCover) => {
            this.projectLinkClicked = true
            // Pass the project cover ref back to the page so that the leave animation logic is
            // handled there.
            this.projectCover = projectCover
          }}
        />

        <LinkColumn
          href={prefixLink('/projects/')}
          icon={true}
          text="All projects."
          pull="right"
        />
      </StretchedContainer>
    )
  }
}

export default Index
