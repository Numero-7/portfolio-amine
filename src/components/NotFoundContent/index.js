import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import Text from '../Text'
import SwagButton from '../SwagButton'
import styles from './not-found-content.module.scss'

const NotFoundContent = () => (
  <section className={styles.root}>
    <Text>404 not found.</Text>

    <div className={styles.buttonWrapper}>
      <SwagButton
        text="Go back to homepage"
        href={prefixLink('/')}
      />
    </div>
  </section>
)

export default NotFoundContent
