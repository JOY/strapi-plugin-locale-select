import React from 'react';
import { Country } from 'country-state-city';
import { Combobox, ComboboxOption } from '@strapi/design-system';

function countryFlag(code: string = '') {
  if (!code) return '';
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

const CountrySelect: React.FC<Props> = ({ name, value, onChange }) => {
  // Lọc các options hiển thị dựa trên giá trị nhập vào
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    console.log('inputValue:', inputValue);
  }, [inputValue]);

  // Lọc các options dựa trên giá trị nhập vào
  // Helper: remove accents
  const removeAccents = (str: string) =>
    str.normalize('NFD').replace(/\u0300-\u036f/g, '');

  const safeInput = typeof inputValue === 'string' ? inputValue : '';
  const filterValue = removeAccents(safeInput).toLowerCase();

  const filteredOptions = filterValue
    ? options.filter(option => {
        const label = removeAccents(option.label).toLowerCase();
        const value = removeAccents(option.value).toLowerCase();
        return label.includes(filterValue) || value.includes(filterValue);
      })
    : options;

  return (
    <Combobox
      label="Country"
      placeholder="Select country"
      value={value}
      clearLabel="Clear"
      onClear={() => onChange({ target: { name, value: null } })}
      onChange={(v: string | undefined) => onChange({ target: { name, value: v ?? null } })}
      // onSearch={setInputValue} // Đã revert về onInputChange
      onInputChange={e => {
        if (typeof e === 'string') {
          setInputValue(e);
          console.log('CountrySelect onInputChange (string):', e);
        } else if (e && typeof e === 'object' && 'target' in e && typeof e.target.value === 'string') {
          setInputValue(e.target.value);
          console.log('CountrySelect onInputChange (event):', e.target.value, e);
        } else {
          setInputValue('');
          console.log('CountrySelect onInputChange (unknown):', e);
        }
      }}
    >
      {filteredOptions.map((o) => (
        <ComboboxOption key={o.value} value={o.value}>
          {o.label}
        </ComboboxOption>
      ))}
    </Combobox>
  );
};

export default CountrySelect;
