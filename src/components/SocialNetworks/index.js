import React from 'react'
import { config } from 'config'
import SwagButton from '../SwagButton'
import styles from './social-networks.module.scss'

const SocialNetworks = () => (
  <ul className={styles.root}>
    {config.socialNetworks.map(network => (
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

export default SocialNetworks
