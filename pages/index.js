import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import Slider from 'src/components/Slider'

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
    setTimeout(callback, this.animationTime)
  }

  render () {
    const { projectsData } = this.props

    return (
      <StretchedContainer ref={(component) => { this.root = component }}>
        <LinkColumn
          href={prefixLink('/about/')}
          text="About me."
        />

        <Slider projectsData={projectsData} />

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
