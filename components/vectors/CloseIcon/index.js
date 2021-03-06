import React from 'react'
import PropTypes from 'prop-types'

const CloseIcon = ({ width = 385, height = 385, fill = 'black' }) => (
  <svg width={width} height={height} viewBox="0 0 385 385" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M323.15 377.05L377.05 323.15C386.45 313.75 386.45 298.65 377.05 289.25L279.85 192.05L377.05 94.85C386.45 85.45 386.45 70.35 377.05 60.95L323.15 7.05C313.75 -2.35 298.65 -2.35 289.25 7.05L192.05 104.25L94.85 7.05C85.45 -2.35 70.35 -2.35 60.95 7.05L7.05 60.95C-2.35 70.35 -2.35 85.45 7.05 94.85L104.25 192.05L7.05 289.25C-2.35 298.65 -2.35 313.75 7.05 323.15L60.95 377.05C70.35 386.45 85.45 386.45 94.85 377.05L192.05 279.85L289.25 377.05C298.55 386.35 313.75 386.35 323.15 377.05Z" fill={fill}/>
  </svg>

)

CloseIcon.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string
}

export default CloseIcon
