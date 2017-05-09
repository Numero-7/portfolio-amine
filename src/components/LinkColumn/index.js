import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './link-column.module.scss'

const LinkColumn = ({ handleClick, transparent, text, href, pull, icon }) => (
  <div className={`${styles.root} ${styles[pull]} ${transparent ? styles.transparent : ''}`}>
    <Link
      onClick={handleClick}
      className={styles.link}
      to={href}
    >
      {icon
        ? (
          <svg
            className={styles.icon}
            width="20"
            height="20"
          >
            <title>{text}</title>
            {[{ x: 0, y: 0 }, { x: 12, y: 0 }, { x: 0, y: 12 }, { x: 12, y: 12 }].map(rect => (
              <rect
                x={rect.x}
                y={rect.y}
                width="8"
                height="8"
              />
            ))}
          </svg>
        )
        : <span className={styles.verticalText}>{text}</span>
      }
    </Link>
  </div>
)

LinkColumn.propTypes = {
  handleClick: PropTypes.func,
  transparent: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.bool,
  href: PropTypes.string.isRequired,
  pull: PropTypes.oneOf(['right', 'left'])
}

LinkColumn.defaultProps = {
  handleClick: () => {},
  transparent: false,
  pull: 'left',
  text: '',
  icon: false
}

export default LinkColumn
