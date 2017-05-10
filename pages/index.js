import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite, TimelineLite, Power2 } from 'gsap'
import { HOME_PAGE_COVER_FILL_DURATION, PAGE_FADE_DURATION } from 'src/values/animations'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import Slider from 'src/components/Slider'

class Index extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    previousPath: PropTypes.string.isRequired,
    transitionPage: PropTypes.func.isRequired,
    notifyPageTransitionEnded: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      sliderOpacity: 1
    }
  }

  componentWillAppear (onComplete) {
    TweenLite.fromTo(
      this,
      PAGE_FADE_DURATION,
      { state: { sliderOpacity: 0 } },
      { state: { sliderOpacity: 1 }, onComplete }
    )
  }

  componentWillEnter (onComplete) {
    const { previousPath, transitionPage } = this.props

    if (previousPath === '/about/' || previousPath === '/projects/') {
      transitionPage('in', onComplete, true)
    } else {
      TweenLite.fromTo(
        this,
        1,
        { state: { sliderOpacity: 0 } },
        { state: { sliderOpacity: 1 }, onComplete }
      )
    }
  }

  componentWillLeave (onComplete) {
    if (this.projectLinkClicked) {
      this.slider.animatingOut = true
      const timeline = new TimelineLite({ onComplete })
      timeline
        .fromTo(
          this.projectCover,
          HOME_PAGE_COVER_FILL_DURATION,
          { strokeDashoffset: `-${this.projectCoverPerimeter}` },
          { strokeDashoffset: 0, ease: Power2.easeOut }
        )
        .fromTo(
          this,
          PAGE_FADE_DURATION,
          { state: { sliderOpacity: 1 } },
          { state: { sliderOpacity: 0 } }
        )
    } else {
      this.props.transitionPage('out', onComplete)
    }
  }

  componentWillUnmount () {
    this.props.notifyPageTransitionEnded()
  }

  render () {
    const { sliderOpacity } = this.state
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

        <div style={{ opacity: sliderOpacity }}>
          <Slider
            ref={(component) => { this.slider = component }}
            projectsData={projectsData}
            handleProjectLinkClick={(projectCover, projectCoverPerimeter) => {
              this.projectLinkClicked = true
              // Pass the ProjectCover ref back to the page along with its perimeter so that the
              // leave animation logic is fully handled here.
              this.projectCover = projectCover
              this.projectCoverPerimeter = projectCoverPerimeter
            }}
          />
        </div>

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
