import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'

const About = ({ previousPath }) => (
  <div>
    <LinkColumn
      text="Close."
      href={prefixLink(previousPath) || prefixLink('/')}
    />

    <AboutContent />
  </div>
)

About.propTypes = {
  previousPath: PropTypes.string.isRequired
}

export default About
exports.data = {
  needsRootData: true,
  hideHeader: true,
  assets: ['/static/images/about-picture.png']
}
