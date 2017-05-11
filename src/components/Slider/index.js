import React, { Component, PropTypes } from 'react'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import SliderCover from '../SliderCover'
import SliderBreadCrumb from '../SliderBreadCrumb'
import styles from './slider.module.scss'

class Slider extends Component {
  static propTypes = {
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  getInitialState () {
    return {
      currentIndex: 0
    }
  }

  componentDidMount () {
    this.keyDownListener = e => this.handleKeyDown(e)
    this.mouseWheelListener = throttle(
      e => this.handleMouseWheel(e),
      2000,
      { leading: true, trailing: false }
    )
    window.addEventListener('keydown', this.keyDownListener)
    window.addEventListener('wheel', this.mouseWheelListener, { passive: true })
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.keyDownListener)
    window.removeEventListener('wheel', this.mouseWheelListener)
  }

  handleKeyDown ({ keyCode }) {
    const { currentIndex } = this.state
    let newIndex = 0

    switch (keyCode) {
      case 39: // Right
      case 40: // Down
        newIndex = currentIndex + 1
        break

      case 38: // Up
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

  handleProjectSwitch = debounce((newIndex) => {
    if (!this.animatingOut) {
      const projectsDataCount = this.props.projectsData.length - 1
      let index = newIndex

      if (index > projectsDataCount) {
        index = 0
      } else if (index < 0) {
        index = projectsDataCount
      }

      this.setState({ currentIndex: index })
    }
  }, 350, { leading: true, trailing: false })

  render () {
    const { currentIndex } = this.state
    const { projectsData } = this.props

    return (
      <section className={styles.root}>
        <SliderCover
          project={projectsData[currentIndex]}
          {...this.props}
        />
        <SliderBreadCrumb
          projectsData={projectsData}
          handleProjectSwitch={newIndex => this.handleProjectSwitch(newIndex)}
          currentIndex={currentIndex}
        />
      </section>
    )
  }
}

export default Slider
