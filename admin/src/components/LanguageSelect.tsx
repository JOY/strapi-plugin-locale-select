import React from 'react';
import {
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system/SingleSelect';
import ISO6391 from 'iso-639-1';

const options = ISO6391.getAllCodes().map((code) => ({
  value: code,
  label: `${ISO6391.getNativeName(code)} (${code})`,
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const LanguageSelect: React.FC<Props> = ({ name, value, onChange }) => (
  <SingleSelect
    label="Language"
    placeholder="Select language"
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

export default LanguageSelect;
