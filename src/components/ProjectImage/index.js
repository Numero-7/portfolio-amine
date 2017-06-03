import React, { Component } from 'react'
import { string } from 'prop-types'
import Waypoint from 'react-waypoint'
import breakpoints from 'src/values/breakpoints'
import styles from './project-image.module.scss'

class ProjectImage extends Component {
  static propTypes = {
    src: string.isRequired,
    title: string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { visible: window.innerWidth < breakpoints.desktop }
  }

  render () {
    const { visible } = this.state
    const { src, title } = this.props

    return (
      <Waypoint
        topOffset="-10%"
        onEnter={() => this.setState({ visible: true })}
      >
        <img
          className={`${styles.image} ${visible ? styles.visible : ''}`}
          src={src}
          alt={`showcasing ${title} project`}
        />
      </Waypoint>
    )
  }
}

export default ProjectImage
