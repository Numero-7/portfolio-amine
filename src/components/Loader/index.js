import React, { Component } from 'react'
import { func, array } from 'prop-types'
import assetsLoader from 'assets-loader'
import ProgressBar from '../ProgressBar'
import styles from './loader.module.scss'

class Loader extends Component {
  static propTypes = {
    onReady: func.isRequired,
    assets: array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { progress: 0 }
  }

  componentDidMount () {
    this.loadAssets()
  }

  componentWillUnmount () {
    this.loader.destroy()
  }

  loadAssets () {
    const { assets, onReady } = this.props
    this.loader = assetsLoader({ assets })
      .on('progress', progress => this.setState({ progress: Math.round(progress * 100) }))
      .on('complete', onReady)
      .start()
  }

  render () {
    const { progress } = this.state

    return (
      <section className={styles.root}>
        <div className={styles.wrapper}>
          <span className={styles.welcomeText}>WELCOME</span>
          <div className={styles.progressBarWrapper}>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </section>
    )
  }
}

export default Loader
