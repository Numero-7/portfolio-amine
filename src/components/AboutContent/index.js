import React from 'react'
import ShowWhen from '../ShowWhen'
import TextShadow from '../TextShadow'
import Text from '../Text'
import SocialNetworks from '../SocialNetworks'
import styles from './about-content.module.scss'

const AboutContent = () => (
  <div className={styles.root}>
    <div className={`${styles.shadowWrapper} ${styles.topShadowWrapper}`}>
      <TextShadow text="About" />
    </div>

    <div className={styles.contentWrapper}>
      <Text>
        Yo, I’m Amine, a 21 years old French designer and freelancer based in Paris.
        <br />
        I am in 4th year at&nbsp;
        <a
          href="https://www.hetic.net/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          HETIC
        </a>
        .
        <br />
        Formerly part of&nbsp;
        <a
          href="https://boldbeyond.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Bold+Beyond
        </a>
        &nbsp;and currently working for&nbsp;
        <a
          href="https://pureemaison.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Purée Maison
        </a>
        &nbsp;in my spare time.
        <br />
        <span className={styles.gold}>I am looking for a 6-month internship…</span>
      </Text>

      <div className={styles.socialNetworksWrapper}>
        <SocialNetworks />
      </div>
    </div>

    <ShowWhen when="desktop">
      <div className={styles.shadowWrapper}>
        <TextShadow text="Me" />
      </div>
    </ShowWhen>
  </div>
)

export default AboutContent
