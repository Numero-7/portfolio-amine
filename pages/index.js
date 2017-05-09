import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TimelineLite, Power2 } from 'gsap'
import { HOME_PAGE_COVER_FILL_DURATION } from 'src/values/animations'
import fadeElement from 'src/utils/fade-element'
import PageTransitionLayer from 'src/components/PageTransitionLayer'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import Slider from 'src/components/Slider'

class Index extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    handlePageTransitionEnd: PropTypes.func.isRequired
  }

  componentWillAppear (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.slider.base, timeline, {})
  }

  componentWillEnter (onComplete) {
    const timeline = new TimelineLite({ onComplete })
    fadeElement(this.slider.base, timeline, {})
  }

  componentWillLeave (onComplete) {
    const timeline = new TimelineLite({ onComplete })

    if (this.projectLinkClicked) {
      timeline.fromTo(
        this.projectCover,
        HOME_PAGE_COVER_FILL_DURATION,
        { strokeDashoffset: `-${this.projectCoverPerimeter}` },
        { strokeDashoffset: 0, ease: Power2.easeOut }
      )
      fadeElement(this.slider.base, timeline, { fadeOut: true })
    } else {
      this.transitionLayer.animateOut(timeline)
    }
  }

  componentWillUnmount () {
    this.props.handlePageTransitionEnd(true)
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

        <PageTransitionLayer ref={(component) => { this.transitionLayer = component }} />

        <LinkColumn
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
