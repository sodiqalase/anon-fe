import React from 'react'
import PropTypes from 'prop-types'

const UserIcon = ({ width = 448, height = 512, fill = 'black' }) => (
  <svg width={width} height={height} viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M388.829 295.324L409.801 240.272C412.793 232.418 406.992 224 398.587 224H340.39C347.84 207.764 352 189.703 352 170.667C352 167.036 351.84 163.443 351.544 159.889C391.083 152.074 416 140.684 416 128C416 114.737 388.769 102.888 346.053 95.0629C336.868 62.2579 318.875 29.2658 305.339 12.2128C295.887 0.304847 279.466 -3.42115 265.868 3.37885L238.311 17.1578C233.868 19.3798 228.968 20.5366 224 20.5366C219.032 20.5366 214.132 19.3798 209.689 17.1578L182.132 3.37785C168.533 -3.42115 152.112 0.303846 142.661 12.2118C129.125 29.2648 111.132 62.2568 101.947 95.0618C59.231 102.888 32 114.737 32 128C32 140.684 56.917 152.074 96.456 159.889C96.1542 163.474 96.0021 167.069 96 170.667C96 189.704 100.159 207.765 107.608 224H50.198C41.583 224 35.775 232.808 39.169 240.727L62.075 294.174C25.799 307.882 0 342.925 0 384V464C0 490.51 21.49 512 48 512H400C426.51 512 448 490.51 448 464V384C448 344.03 423.57 309.769 388.829 295.324ZM184 488L136 296L184 320L208 360L184 488ZM264 488L240 360L264 320L312 296L264 488ZM318.778 184.254C318.77 184.297 314.479 187.485 313.653 190.025C309.792 201.889 306.627 214.597 297.139 223.384C287.068 232.711 249.182 245.789 233.143 198.355C230.306 189.96 217.696 189.957 214.858 198.355C197.895 248.523 158.839 230.772 150.862 223.384C141.374 214.598 138.209 201.889 134.348 190.025C133.522 187.485 129.23 184.297 129.223 184.254C128.669 181.329 128.242 178.37 128.003 175.404C127.694 171.556 138.081 171.746 139.081 171.657C165.384 169.331 191.384 171.078 217.104 177.154C219.667 177.76 228.657 177.683 230.897 177.154C256.617 171.078 282.617 169.33 308.92 171.657C309.922 171.746 320.307 171.555 319.998 175.404C319.759 178.37 319.332 181.329 318.778 184.254Z" fill={fill}/>
  </svg>

)

UserIcon.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string
}

export default UserIcon