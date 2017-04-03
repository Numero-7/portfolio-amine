import React, { PropTypes } from 'react'
import styles from './container.module.scss'

const Container = ({ children }) => (
  <main className={styles.root}>
    {children}
  </main>
)

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
