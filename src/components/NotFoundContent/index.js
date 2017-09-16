import React from 'react'
import Text from '@components/Text'
import SwagButton from '@components/SwagButton'
import styles from './not-found-content.module.scss'

const NotFoundContent = () => (
  <section className={styles.root}>
    <Text>404 not found.</Text>

    <div className={styles.buttonWrapper}>
      <SwagButton
        text="Go back to homepage"
        href="/"
      />
    </div>
  </section>
)

export default NotFoundContent
