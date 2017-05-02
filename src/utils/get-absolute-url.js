import { config } from 'config'

const getAbsoluteURL = path => (
  config.siteURL + path
)

export default getAbsoluteURL
