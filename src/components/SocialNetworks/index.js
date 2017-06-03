import React from 'react'
import { arrayOf, object } from 'prop-types'
import SwagButton from '../SwagButton'
import styles from './social-networks.module.scss'

const SocialNetworks = ({ socialNetworks }) => (
  <ul className={styles.root}>
    {socialNetworks.map(network => (
      <li>
        <SwagButton
          text={network.name}
          href={network.href}
          external={true}
        />
      </li>
    ))}
  </ul>
)

SocialNetworks.propTypes = {
  socialNetworks: arrayOf(object).isRequired
}

export default SocialNetworks
export const socialNetworksQuery = `
  site {
    siteMetadata {
      socialNetworks
    }
  }
`
