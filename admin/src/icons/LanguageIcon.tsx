import React from 'react';
import { Icon } from '@strapi/design-system/Icon';

/** Stylised “A” icon for Language field */
const LanguageIcon = (props) => (
  <Icon {...props}>
    <svg viewBox="0 0 24 24" fill="none">
      {/* frame */}
      <rect width="24" height="24" rx="4" fill="#F0F0FF" stroke="#D9D8FF" />
      {/* letter “A” */}
      <path
        d="M8 15l4-8 4 8M9 13h6"
        stroke="#4945FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default LanguageIcon;
