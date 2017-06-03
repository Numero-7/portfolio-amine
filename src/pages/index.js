import React, { Component } from 'react'
import { arrayOf, object, string, bool, func } from 'prop-types'
import Helmet from 'react-helmet'
import TweenLite from 'gsap/TweenLite'
import TimelineLite from 'gsap/TimelineLite'
import { PAGE_FADE_DURATION } from '@values/animations'
import breakpoints from '@values/breakpoints'
import ShowWhen from '@components/ShowWhen'
import StretchedContainer from '@components/StretchedContainer'
import LinkColumn from '@components/LinkColumn'
import Slider from '@components/Slider'
import ProjectsList from '@components/ProjectsList'

class Index extends Component {
  static propTypes = {
    projectsData: arrayOf(object).isRequired,
    previousPath: string.isRequired,
    isMobile: bool.isRequired,
    transitionPage: func.isRequired,
    notifyPageTransitionEnded: func.isRequired
  }

  getInitialState () {
    return {
      sliderOpacity: 1
    }
  }

  componentWillAppear (onComplete) {
    if (window.innerWidth >= breakpoints.desktop) {
      TweenLite.fromTo(
        this,
        PAGE_FADE_DURATION,
        { state: { sliderOpacity: 0 } },
        { state: { sliderOpacity: 1 }, onComplete }
      )
    } else {
      onComplete()
    }
  }

  componentWillEnter (onComplete) {
    const { previousPath, transitionPage } = this.props

    if (previousPath === '/about/' || previousPath === '/projects/') {
      transitionPage('in', onComplete, true)
    } else if (window.innerWidth >= breakpoints.desktop) {
      TweenLite.fromTo(
        this,
        1,
        { state: { sliderOpacity: 0 } },
        { state: { sliderOpacity: 1 }, onComplete }
      )
    } else {
      onComplete()
    }
  }

  componentWillLeave (onComplete) {
    if (this.projectLinkClicked) {
      if (window.innerWidth >= breakpoints.desktop) {
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
        onComplete()
      }
    } else {
      this.props.transitionPage('out', onComplete)
    }
  }

  componentWillUnmount () {
    this.props.notifyPageTransitionEnded()
  }

  render () {
    const { sliderOpacity } = this.state
    const { projectsData, isMobile } = this.props

    return (
      <StretchedContainer>
        <Helmet
          htmlAttributes={{
            class: isMobile ? '' : 'unscrollable'
          }}
        />

        <LinkColumn
          href="/about/"
          text="About me."
        />

        <ShowWhen when="desktop">
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
        </ShowWhen>

        <ShowWhen when="small">
          <ProjectsList projectsData={projectsData} />
        </ShowWhen>

        <LinkColumn
          href="/projects/"
          icon={true}
          text="All projects."
          pull="right"
        />
      </StretchedContainer>
    )
  }
}

export default Index
export const data = {
  assets: [
    '/static/images/smoke-1.png',
    '/static/images/smoke-2.png'
  ]
}
