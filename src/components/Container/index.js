import React from 'react'
import { node } from 'prop-types'
import styles from './container.module.scss'

const Container = ({ children }) => (
  <main className={styles.root}>
    {children}
  </main>
)

Container.propTypes = {
  children: node.isRequired
}

export default Container
