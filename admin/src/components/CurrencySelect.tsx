import React from 'react';
import {
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system/SingleSelect';
import cc from 'currency-codes';

const options = cc.data.map((c) => ({
  value: c.code,
  label: `${c.currency} (${c.code})`,
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const CurrencySelect: React.FC<Props> = ({ name, value, onChange }) => (
  <SingleSelect
    label="Currency"
    placeholder="Select currency"
    value={value}
    clearLabel="Clear"
    onClear={() => onChange({ target: { name, value: null } })}
    onChange={(v) => onChange({ target: { name, value: v ?? null } })}
  >
    {options.map((o) => (
      <SingleSelectOption key={o.value} value={o.value}>
        {o.label}
      </SingleSelectOption>
    ))}
  </SingleSelect>
);

export default CurrencySelect;
