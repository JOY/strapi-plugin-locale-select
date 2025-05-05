import React from 'react';
import {
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system/Select';
import tzdata from 'react-timezone-select/dist/data'; // chỉ chứa labels

// react-timezone-select xuất object { [zone]: { abbr, altName, label } }
const options = Object.entries(tzdata).map(([zone, meta]) => ({
  value: zone,           // e.g. "Asia/Ho_Chi_Minh"
  label: meta.label,     // "Ho Chi Minh City (GMT+07:00)"
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
    onChange={(v) =>
      onChange({ target: { name, value: v ?? null } })
    }
  >
    {options.map((o) => (
      <SingleSelectOption key={o.value} value={o.value}>
        {o.label}
      </SingleSelectOption>
    ))}
  </SingleSelect>
);

export default TimezoneSelect;
