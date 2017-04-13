import React, { Component, PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import Waypoint from 'react-waypoint'
import styles from './project-image.module.scss'

class ProjectImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { visible: false }
  }

  render () {
    const { visible } = this.state
    const { src, title } = this.props

    return (
      <Waypoint
        scrollableAncestor={window}
        bottomOffset="15%"
        onEnter={() => this.setState({ visible: true })}
      >
        <img
          className={`${styles.image} ${visible ? styles.visible : ''}`}
          src={prefixLink(src)}
          alt={`showcasing ${title} project`}
        />
      </Waypoint>
    )
  }
}

export default ProjectImage
