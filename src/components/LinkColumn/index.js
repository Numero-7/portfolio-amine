import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './link-column.module.scss'

const LinkColumn = ({ text, href, pull }) => (
  <div className={`${styles.root} ${styles[pull]}`}>
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
  pull: PropTypes.oneOf(['right', 'left'])
}

LinkColumn.defaultProps = {
  pull: 'left'
}

export default LinkColumn
