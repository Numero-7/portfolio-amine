import { layoutGenerator } from 'react-break'

const breakpoints = layoutGenerator({
  mobile: 899,
  desktop: 900
})

const OnMobile = breakpoints.isAtMost('mobile')
const OnDesktop = breakpoints.isAtLeast('desktop')

export default {
  OnMobile,
  OnDesktop
}
