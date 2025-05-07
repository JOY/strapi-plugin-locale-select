import React from 'react';
import { Combobox, ComboboxOption } from '@strapi/design-system';
import countries from 'i18n-iso-countries';

// load English labels (thêm locale khác nếu cần)
countries.registerLocale(
  require('i18n-iso-countries/langs/en.json')
);

function countryFlag(code: string) {
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt()));
}

const options = Object.entries(
  countries.getNames('en', { select: 'official' })
).map(([code, name]) => ({
  value: code,
  label: `${countryFlag(code)} ${name} (${code})`,
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const CountrySelect: React.FC<Props> = ({ name, value, onChange }) => (
  <Combobox
    label="Country"
    placeholder="Select country"
    value={value}
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

export default CountrySelect;
