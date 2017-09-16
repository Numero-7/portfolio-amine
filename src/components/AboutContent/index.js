import React from 'react'
import ShowWhen from '@components/ShowWhen'
import TextShadow from '@components/TextShadow'
import Text from '@components/Text'
import SocialNetworks from '@components/SocialNetworks'
import Credits from '@components/Credits'
import styles from './about-content.module.scss'

const AboutContent = () => (
  <div className={styles.root}>
    <div className={`${styles.shadowWrapper} ${styles.topShadowWrapper}`}>
      <TextShadow text="About" />
    </div>

    <div className={styles.contentWrapper}>
      <Text>
        Hey, I’m Amine, a 22-year old French digital designer and freelancer based in Paris.
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

    <Credits>
      Developed by&nbsp;
      <span className={styles.devWrapper}>
        <a
          href="http://tom-bonnike.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.dev}
        >
          Tom Bonnike&nbsp;
        </a>
        &&nbsp;
        <a
          href="http://martingoutry.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.dev}
        >
          Martin Goutry
        </a>
      </span>
    </Credits>
  </div>
)

export default AboutContent
