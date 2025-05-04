import React from 'react';

/** Generic “S” currency glyph */
const CurrencyIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
  >
    <rect width="24" height="24" rx="4" fill="#F0F0FF" stroke="#D9D8FF" />
    <path
      d="M12 7v10M9 10h6M9 14h6"
      stroke="#4945FF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default CurrencyIcon;
