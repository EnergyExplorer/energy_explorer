import React, { useState, useCallback } from 'react';
import { Button } from 'antd';

const RevealButton = ({
  isInitiallyOpen = false,
  renderChildren,
  text,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(isInitiallyOpen)
  const onClick = useCallback(() => setIsVisible(!isVisible), [isVisible])
  const hide = useCallback(() => setIsVisible(false), [])
  return (
    <>
      <Button {...props} onClick={onClick}>
        {text}
      </Button>
      {renderChildren({ isVisible, hide })}
    </>
  )
}

export default RevealButton
