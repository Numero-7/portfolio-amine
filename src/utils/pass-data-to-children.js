import { Children, cloneElement } from 'react'

const passDataToChildren = (children, data) => (
  Children.map(
    children,
    child => cloneElement(child, data)
  )
)

export default passDataToChildren
