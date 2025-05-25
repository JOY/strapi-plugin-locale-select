import React from 'react';
import { Country } from 'country-state-city';
import { Combobox, ComboboxOption } from '@strapi/design-system';

function countryFlag(code: string = '') {
  if (!code) return '';
  // Ensure code is at least 2 characters for country flag, fallback to 'A'
  const safeCode = code.toUpperCase().padEnd(2, 'A');
  return String.fromCodePoint(...[...safeCode].map(c => 127397 + c.charCodeAt()));
}

const options = Country.getAllCountries().map((c) => ({
  value: c.isoCode,
  label: c.name, // chỉ tên quốc gia, không emoji, không mã
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const CountrySelect: React.FC<Props> = ({ name, value, onChange }) => {
  return (
    <Combobox
      label="Country"
      placeholder="Select country"
      value={value || undefined}
      clearLabel="Clear"
      onClear={() => onChange({ target: { name, value: null } })}
      onChange={(v: string | undefined) => onChange({ target: { name, value: v ?? null } })}
    >
      {options.map((o) => (
        <ComboboxOption key={o.value} value={o.value}>
          {o.label}
        </ComboboxOption>
      ))}
    </Combobox>
  );
};

export default CountrySelect;
