import React, { Component, PropTypes } from 'react'
import ProjectPage from '../src/components/ProjectPage'

class JSONWrapper extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  // To handle the animations on the project page, we use its instance methods through a ref.
  // This allows us to have the react-transition-group lifecycle methods in the ProjectPage
  // component instead of handling the logic here.
  componentWillAppear (callback) {
    this.root.componentWillAppear(callback)
  }

  componentWillEnter (callback) {
    this.root.componentWillEnter(callback)
  }

  componentWillLeave (callback) {
    this.root.componentWillLeave(callback)
  }

  render () {
    const { projectsData, route } = this.props
    const project = route.page.data

    return (
      <ProjectPage
        ref={(component) => { this.root = component }}
        projectsData={projectsData}
        project={project}
      />
    )
  }
}

module.exports = JSONWrapper
