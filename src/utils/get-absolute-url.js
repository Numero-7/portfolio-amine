import { siteURL } from '../../gatsby-config'

const getAbsoluteURL = path => (
  siteURL + path
)

export default getAbsoluteURL
