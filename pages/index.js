import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import getPageTitle from 'src/utils/get-page-title'
import SwagButton from 'src/components/SwagButton'

const Index = () => (
  <div>
    <Helmet
      title={getPageTitle()}
    />

    <h1>Hello World</h1>
    <Link to={prefixLink('/about/')}>About</Link>
    <SwagButton text='View project' link='/about/' externalLink={false}/>
  </div>
)

export default Index
