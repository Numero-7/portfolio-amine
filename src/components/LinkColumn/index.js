import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './link-column.module.scss'

const LinkColumn = ({ text, href, orientation }) => (
  <div className={`${styles.root} ${styles[orientation]}`}>
    <Link
      className={styles.link}
      to={href}
    >
      <span className={styles.verticalText}>{text}</span>
    </Link>
  </div>
)

LinkColumn.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  orientation: PropTypes.string
}

LinkColumn.defaultProps = {
  orientation: 'left'
}

export default LinkColumn
