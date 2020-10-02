import React from 'react'
import ShowWhen from '../ShowWhen'
import TextShadow from '../TextShadow'
import Text from '../Text'
import SocialNetworks from '../SocialNetworks'
import Credits from '../Credits'
import styles from './about-content.module.scss'

const AboutContent = () => (
  <div className={styles.root}>
    <div className={`${styles.shadowWrapper} ${styles.topShadowWrapper}`}>
      <TextShadow text="About" />
    </div>

    <div className={styles.contentWrapper}>
      <Text>
        Amine Bouneggar, French creative designer based in Paris specializing in interactive and product design.
        <br />
        Graduated in Master Design from&nbsp;
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
        Previously at&nbsp;
        <a
          href="https://boldbeyond.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Bold Beyond
        </a>
        ,&nbsp;
        <a
          href="https://pureemaison.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Purée Maison
        </a>
        ,&nbsp;

        <a
          href="https://hellodesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Hello Design
        </a>
        ,&nbsp;

        <a
          href="http://uzik.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
        Uzik
        </a>
        ,&nbsp;I have also worked for several agencies and clients as a freelancer (&nbsp;

        <a
          href="https://index.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
        Index
        </a>
        ..)

        <br />
        <span className={styles.gold}>I am looking for a full time position.</span>
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
