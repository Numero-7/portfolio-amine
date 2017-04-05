import React from 'react'

const notFound = () => (
  <div>
    <h1>404 not found.</h1>
  </div>
)

export default notFound
exports.data = {
  path: '/404.html',
  skipLoader: true
}
