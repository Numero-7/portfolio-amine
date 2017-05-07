import { PAGE_FADE_DURATION } from 'src/values/animations'

const fadeElement = (element, timeline, {
  duration = PAGE_FADE_DURATION,
  delay = 0,
  fadeOut = false
}) => {
  const invisible = { autoAlpha: 0 }
  const visible = { autoAlpha: 1, delay }

  timeline.fromTo(
    element,
    duration,
    fadeOut ? visible : invisible,
    fadeOut ? invisible : visible
  )
}

export default fadeElement
