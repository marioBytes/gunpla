import React from 'react'
import { createLink } from '@tanstack/react-router'
import type { LinkComponent } from '@tanstack/react-router'

interface ButtonLinkProps {
  className?: string
}

const ButtonLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  ButtonLinkProps
>((props) => <button {...props} />)

const CreatedButtonLinkComponent = createLink(ButtonLinkComponent)

const CustomButtonLink: LinkComponent<typeof ButtonLinkComponent> = (props) => {
  return <CreatedButtonLinkComponent preload={'intent'} {...props} />
}

export default CustomButtonLink
