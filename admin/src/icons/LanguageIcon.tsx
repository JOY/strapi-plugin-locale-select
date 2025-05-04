import React from 'react';

/** Stylised “A” for language/locale */
const LanguageIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
  >
    <rect width="24" height="24" rx="4" fill="#F0F0FF" stroke="#D9D8FF" />
    <path
      d="M8 15l4-8 4 8M9 13h6"
      stroke="#4945FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LanguageIcon;
