import React from 'react';
import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { allTimezones } from 'react-timezone-select';

// allTimezones = { "Asia/Ho_Chi_Minh": "Ho Chi Minh City (GMT+07:00)", … }
const options = Object.entries(allTimezones).map(([zone, label]) => ({
  value: zone,
  label,
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const TimezoneSelect: React.FC<Props> = ({ name, value, onChange }) => (
  <SingleSelect
    label="Time zone"
    placeholder="Select time zone"
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

export default TimezoneSelect;
