import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite, Power2 } from 'gsap'
import {
  PAGE_FADE_DURATION,
  HOME_PAGE_COVER_FILL_DURATION
} from 'src/values/animations'
import fadeElement from 'src/utils/fade-element'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import Slider from 'src/components/Slider'
import { projectCoverPerimeter } from 'src/sass/variables/exports.module.scss'

class Index extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor (props) {
    super(props)
    this.columns = []
  }

  componentWillAppear (callback) {
    const timeline = new TimelineLite({ onComplete: callback })
    fadeElement(this.slider.base, timeline, {})
  }

  componentWillEnter (callback) {
    const timeline = new TimelineLite({ onComplete: callback })
    fadeElement(this.columns, timeline, { duration: 0 })
    fadeElement(this.slider.base, timeline, { delay: PAGE_FADE_DURATION })
  }

  componentWillLeave (callback) {
    const timeline = new TimelineLite({ onComplete: callback })
    fadeElement(this.columns, timeline, { duration: 0, fadeOut: true })

    if (this.projectLinkClicked) {
      timeline.fromTo(
        this.projectCover,
        HOME_PAGE_COVER_FILL_DURATION,
        { strokeDashoffset: `-${projectCoverPerimeter}` },
        { strokeDashoffset: 0, ease: Power2.easeOut }
      )

      fadeElement(this.slider.base, timeline, { fadeOut: true })
    }
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
          ref={component => component && this.columns.push(component.base)}
          href={prefixLink('/about/')}
          text="About me."
        />

        <Slider
          ref={(component) => { this.slider = component }}
          projectsData={projectsData}
          handleProjectLinkClick={(projectCover) => {
            this.projectLinkClicked = true
            // Pass the ProjectCover ref back to the page so that the leave animation logic is
            // handled here.
            this.projectCover = projectCover
          }}
        />

        <LinkColumn
          ref={component => component && this.columns.push(component.base)}
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
