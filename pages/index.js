import React from 'react'
import Helmet from 'react-helmet'
import getPageTitle from '../utils/get-page-title'

const Index = () => (
  <div>
    <Helmet
      title={getPageTitle()}
    />
    <h1>Hello World</h1>
  </div>
)

export default Index
