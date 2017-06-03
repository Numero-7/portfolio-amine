import React, { Component } from 'react'
import { object, arrayOf } from 'prop-types'
import ProjectPage from '@components/ProjectPage'

class JSONWrapper extends Component {
  static propTypes = {
    route: object.isRequired,
    projectsData: arrayOf(object).isRequired
  }

  // To handle the animations on the project page, we use its instance methods through a ref.
  // This allows us to have the react-transition-group lifecycle methods in the ProjectPage
  // component instead of handling the logic here.
  componentWillAppear (onComplete) {
    this.root.componentWillAppear(onComplete)
  }

  componentWillEnter (onComplete) {
    this.root.componentWillEnter(onComplete)
  }

  componentWillLeave (onComplete) {
    this.root.componentWillLeave(onComplete)
  }

  render () {
    const { projectsData, route } = this.props
    const project = route.page.data

    return (
      <ProjectPage
        ref={(component) => { this.root = component }}
        projectsData={projectsData}
        project={project}
        {...this.props}
      />
    )
  }
}

export default JSONWrapper
