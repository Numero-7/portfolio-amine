import { config } from 'config'

const getCurrentURL = route => (
  config.siteURL + route.path
)

export default getCurrentURL
