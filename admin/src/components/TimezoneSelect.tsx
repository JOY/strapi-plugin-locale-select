import React from 'react';
import { Combobox, ComboboxOption } from '@strapi/design-system';
import { allTimezones } from 'react-timezone-select';
import { DateTime } from 'luxon';

// allTimezones = { "Asia/Ho_Chi_Minh": "Ho Chi Minh City (GMT+07:00)", … }
const options = Object.entries(allTimezones).map(([zone, label]) => {
  let offset = '';
  try {
    offset = DateTime.now().setZone(zone).toFormat('ZZ');
  } catch {}
  return {
    value: zone,
    label: `${label} (GMT${offset})`,
  };
});

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const TimezoneSelect: React.FC<Props> = ({ name, value, onChange }) => (
  <Combobox
    label="Time zone"
    placeholder="Select time zone"
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

export default TimezoneSelect;
