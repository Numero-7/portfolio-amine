import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite, Power2 } from 'gsap'
import {
  TRANSITION_LAYER_DURATION,
  HOME_PAGE_COVER_FILL_DURATION,
  PAGE_FADE_DURATION
} from 'src/values/animations'
import fadeElement from 'src/utils/fade-element'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import Slider from 'src/components/Slider'

class Index extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    previousPath: PropTypes.string.isRequired,
    triggerPageTransition: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.columns = []
  }

  componentWillAppear (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.slider.base, timeline, {})
  }

  componentWillEnter (onComplete) {
    const { previousPath, triggerPageTransition } = this.props
    if (previousPath === '/about/' || previousPath === '/projects/') {
      triggerPageTransition(onComplete, true)
    } else {
      const timeline = new TimelineLite({ onComplete })
      // Temporarily hide the page’s columns so that they do not overlap with the project page’s
      // transparent ones.
      fadeElement(this.columns, timeline, { duration: 0, fadeOut: true })
      // Show them again, after the other page’s fade out is finished.
      fadeElement(this.columns, timeline, { duration: 0, delay: PAGE_FADE_DURATION })
      fadeElement(this.slider.base, timeline, {})
    }
  }

  componentWillLeave (onComplete) {
    if (this.projectLinkClicked) {
      this.slider.blockAnimation()
      const timeline = new TimelineLite({ onComplete })
      timeline.fromTo(
        this.projectCover,
        HOME_PAGE_COVER_FILL_DURATION,
        { strokeDashoffset: `-${this.projectCoverPerimeter}` },
        { strokeDashoffset: 0, ease: Power2.easeOut }
      )
      fadeElement(this.slider.base, timeline, { fadeOut: true })
    } else {
      setTimeout(onComplete, TRANSITION_LAYER_DURATION * 1000)
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
          ref={(component) => { if (component) { this.columns.push(component.base) } }}
          href={prefixLink('/about/')}
          text="About me."
        />

        <Slider
          ref={(component) => { this.slider = component }}
          projectsData={projectsData}
          handleProjectLinkClick={(projectCover, projectCoverPerimeter) => {
            this.projectLinkClicked = true
            // Pass the ProjectCover ref back to the page along with its perimeter so that the leave
            // animation logic is fully handled here.
            this.projectCover = projectCover
            this.projectCoverPerimeter = projectCoverPerimeter
          }}
        />

        <LinkColumn
          ref={(component) => { if (component) { this.columns.push(component.base) } }}
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
