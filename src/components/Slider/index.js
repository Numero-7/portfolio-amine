import React, { Component, PropTypes } from 'react'
import SliderCover from '../SliderCover'
import SliderBreadCrumb from '../SliderBreadCrumb'
import styles from './slider.module.scss'

class Slider extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor (props) {
    super(props)
    this.state = { currentIndex: 0 }
    this.keyDownListener = e => this.handleKeyDown(e)
    this.mouseWheelListener = e => this.handleMouseWheel(e)
    window.addEventListener('keydown', this.keyDownListener)
    window.addEventListener('wheel', this.mouseWheelListener)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.keyDownListener)
    window.removeEventListener('wheel', this.mouseWheelListener)
  }

  handleKeyDown ({ keyCode }) {
    const { currentIndex } = this.state
    let newIndex = 0

    switch (keyCode) {
      case 38: // Up
      case 39: // Right
        newIndex = currentIndex + 1
        break

      case 40: // Bottom
      case 37: // Left
        newIndex = currentIndex - 1
        break

      default:
        return
    }

    this.handleProjectSwitch(newIndex)
  }

  handleMouseWheel ({ deltaY }) {
    const { currentIndex } = this.state
    const newIndex = deltaY > 0 ? currentIndex + 1 : currentIndex - 1
    this.handleProjectSwitch(newIndex)
  }

  handleProjectSwitch (newIndex) {
    const projectsDataCount = this.props.projectsData.length - 1
    let index = newIndex

    if (index > projectsDataCount) {
      index = 0
    } else if (index < 0) {
      index = projectsDataCount
    }

    this.setState({ currentIndex: index })
  }

  render () {
    const { currentIndex } = this.state
    const { projectsData } = this.props

    return (
      <section className={styles.root}>
        <SliderCover project={projectsData[currentIndex]} />
        <SliderBreadCrumb
          projectsData={projectsData}
          handleProjectSwitch={index => this.handleProjectSwitch(index)}
          currentIndex={currentIndex}
        />
      </section>
    )
  }
}

export default Slider
