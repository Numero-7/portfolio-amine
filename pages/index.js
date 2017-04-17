import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'
import Slider from 'src/components/Slider'

const Index = ({ projectsData }) => (
  <div>
    <LinkColumn
      href={prefixLink('/about/')}
      text="About me."
    />

    <Slider projectsData={projectsData} />

    <LinkColumn
      href={prefixLink('/projects/')}
      text="All projects"
      pull="right"
    />
  </div>
)

Index.propTypes = {
  projectsData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Index
exports.data = {
  needsRootData: true
}
