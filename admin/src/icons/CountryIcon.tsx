import React from 'react';
import { Icon } from '@strapi/design-system';

/**
 * Square flag-style icon for the Country field
 * Colors follow Strapi design-system palette:
 *   primary100  #F0F0FF  – background
 *   primary200  #D9D8FF  – border
 *   primary600  #4945FF  – accent
 */
const CountryIcon = (props) => (
  <Icon {...props}>
    <svg viewBox="0 0 24 24" fill="none">
      {/* frame */}
      <rect width="24" height="24" rx="4" fill="#F0F0FF" stroke="#D9D8FF" />
      {/* simple two-stripe flag */}
      <path d="M4 10h16v4H4z" fill="#4945FF" />
      <path d="M4 14h16v3H4z" fill="#FFFFFF" />
    </svg>
  </Icon>
);

export default CountryIcon;
