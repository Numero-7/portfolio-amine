import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import SwagButton from 'src/components/SwagButton'

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

        <h1>Home</h1>
        <SwagButton text="Swag button" />

        {projectsData.map(project => (
          <div>
            <Link to={prefixLink(project.path)}>
              {project.title}
            </Link>
          </div>
        ))}

        <LinkColumn
          href={prefixLink('/projects/')}
          text="All projects"
          pull="right"
        />
      </StretchedContainer>
    )
  }
}

export default Index
