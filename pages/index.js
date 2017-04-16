import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import SwagButton from 'src/components/SwagButton'

class Index extends Component {
  static propTypes = {
    key: PropTypes.string.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor (props) {
    super(props)
    this.animationTime = 10000
  }

  componentWillEnter (callback) {
    setTimeout(callback, this.animationTime)
    // TweenLite.fromTo(
    //   this.root,
    //   1.5,
    //   { x: -window.innerWidth },
    //   { x: 0, onComplete: callback }
    // )
  }

  componentWillLeave (callback) {
    setTimeout(callback, this.animationTime)
    // TweenLite.fromTo(
    //   this.root,
    //   1.5,
    //   { x: 0 },
    //   { x: -window.innerWidth, onComplete: callback }
    // )
  }

  render () {
    const { key, projectsData } = this.props

    return (
      <StretchedContainer
        key={key}
        ref={(component) => { this.root = component }}
      >
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
