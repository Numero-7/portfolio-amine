import React from 'react'
import { config } from 'config'
import TextShadow from '../TextShadow'
import SwagButton from '../SwagButton'
import styles from './about.module.scss'

const AboutContent = () => (
  <div className={styles.root}>
    <div className={styles.shadowWrapper}>
      <TextShadow text="About" />
    </div>
    <div className={styles.mainContent}>
      <p>
        Yo, I’m Amine, a 21 years old French designer and freelancer based in Paris.
        <br />
        I am currently in 4th year at
        <a href="http://hetic.net" target="_blank" rel="noopener noreferrer" className={styles.link}> HETIC </a>
        .
        <br />
        Formely part of
          <a href="http://boldbeyond.com/" target="_blank" rel="noopener noreferrer" className={styles.link}> Bold+Beyond </a>
          and I’m currently working for
          <a href="https://pureemaison.com/" target="_blank" rel="noopener noreferrer" className={styles.link}> Purée Maison </a>
          in my spare time.
        <br />
        <span className={styles.gold}>I am looking for a 6-month internship…</span>
      </p>
      <div className={styles.buttonsContainer}>
        <SwagButton text="Linkedin" external={true} href={config.linkedIn} />
        <div className={styles.buttonWrapper}>
          <SwagButton text="Behance" external={true} href={config.behance} />
        </div>
        <SwagButton text="Mail" external={true} href={config.mail} />
      </div>
    </div>
    <div className={`${styles.shadowWrapper} ${styles.bottomShadowText}`}>
      <TextShadow text="Me" />
    </div>
  </div>
)

export default AboutContent
