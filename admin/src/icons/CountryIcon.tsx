import React from 'react';

/** Simple two-stripe flag icon (24 × 24) */
const CountryIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
  >
    <rect width="24" height="24" rx="4" fill="#F0F0FF" stroke="#D9D8FF" />
    <path d="M4 10h16v4H4z" fill="#4945FF" />
    <path d="M4 14h16v3H4z" fill="#FFFFFF" />
  </svg>
);

export default CountryIcon;
