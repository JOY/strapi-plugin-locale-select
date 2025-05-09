import React from 'react';
import { Country } from 'country-state-city';
import { Combobox, ComboboxOption } from '@strapi/design-system';

function countryFlag(code: string) {
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt()));
}

const options = Country.getAllCountries().map((c) => ({
  value: c.isoCode,
  label: `${countryFlag(c.isoCode)} ${c.name} (${c.isoCode})`,
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
