import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { TweenLite, TimelineLite, Power2 } from 'gsap'
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
    this.animationTime = 2000
  }

  componentWillAppear (callback) {
    // INITIAL RENDER ANIMATION GOES HERE
    callback(this) // (this = temporarily ignore eslint)
  }

  componentWillEnter (callback) {
    // SUBSEQUENT ENTER ANIMATIONS GO HERE
    setTimeout(callback, this.animationTime)
  }

  componentWillLeave (callback) {
    // LEAVE ANIMATION GOES HERE
    const tl = new TimelineLite({
      onComplete: callback
    })

    if (this.projectLinkClicked) {
      tl.fromTo(
        this.projectCover,
        2.5,
        { strokeDashoffset: `-${projectCoverPerimeter}` },
        { strokeDashoffset: 0, ease: Power2.easeOut }
      )
    }
  }

  componentDidLeave () {
    // Always undraw the white rectangle when leaving the page.
    TweenLite.to(
      this.projectCover,
      0,
      { strokeDashoffset: `-${projectCoverPerimeter}` }
    )
  }

  render () {
    const { projectsData } = this.props

    return (
      <StretchedContainer ref={(component) => { this.root = component }}>
        <LinkColumn
          href={prefixLink('/about/')}
          text="About me."
        />

        <Slider
          projectsData={projectsData}
          handleProjectLinkClick={(projectCover) => {
            this.projectLinkClicked = true
            // Pass the project cover back to the page so that the leave animation logic is handled
            // there.
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
