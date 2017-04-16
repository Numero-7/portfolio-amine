import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers'
import StretchedContainer from 'src/components/StretchedContainer'
import LinkColumn from 'src/components/LinkColumn'
import AboutContent from 'src/components/AboutContent'

const About = ({ previousPath }) => {
  const columnPosition = (previousPath === '/projects/' ? 'left' : 'right')

  return (
    <StretchedContainer
      pushed={false}
      paddingSide={columnPosition}
    >
      <AboutContent />

      <LinkColumn
        href={prefixLink(previousPath) || prefixLink('/')}
        text="Close."
        pull={columnPosition}
      />
    </StretchedContainer>
  )
}

About.propTypes = {
  previousPath: PropTypes.string.isRequired
}

export default About
exports.data = {
  hideHeader: true,
  assets: [
    '/static/images/about-picture.png'
  ]
}
