import React from 'react';
import {
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system';
import countries from 'i18n-iso-countries';

// load English labels (thêm locale khác nếu cần)
countries.registerLocale(
  require('i18n-iso-countries/langs/en.json')
);

const options = Object.entries(
  countries.getNames('en', { select: 'official' })
).map(([code, name]) => ({
  value: code,
  label: `${name} (${code})`,
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const CountrySelect: React.FC<Props> = ({ name, value, onChange }) => (
  <SingleSelect
    label="Country"
    placeholder="Select country"
    value={value}
    clearLabel="Clear"
    onClear={() => onChange({ target: { name, value: null } })}
    onChange={(v: string | undefined) => onChange({ target: { name, value: v ?? null } })}
  >
    {options.map((o) => (
      <SingleSelectOption key={o.value} value={o.value}>
        {o.label}
      </SingleSelectOption>
    ))}
  </SingleSelect>
);

export default CountrySelect;
