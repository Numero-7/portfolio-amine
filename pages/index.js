import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite, TimelineLite } from 'gsap'
import { PAGE_FADE_DURATION } from 'src/values/animations'
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
      timeline.add(() => {
        this.projectCoverCallback(timeline, () => {
          timeline.fromTo(
            this,
            PAGE_FADE_DURATION,
            { state: { sliderOpacity: 1 } },
            { state: { sliderOpacity: 0 } }
          )
        })
      })
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
            handleProjectLinkClick={(projectCoverCallback) => {
              this.projectLinkClicked = true
              // Pass a callback to the page so that we can pass back the leave animation timeline
              // to the SliderCover component when transitioning the page out.
              this.projectCoverCallback = projectCoverCallback
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
