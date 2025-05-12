import React from 'react';
import { Combobox, ComboboxOption } from '@strapi/design-system';
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

const CurrencySelect: React.FC<Props> = ({ name, value, onChange }) => {
  // Lọc các options hiển thị dựa trên giá trị nhập vào
  const [inputValue, setInputValue] = React.useState('');
  
  // Lọc các options dựa trên giá trị nhập vào
  const filteredOptions = inputValue ? options.filter(option => {
    const searchValue = inputValue.toLowerCase();
    const optionLabel = option.label.toLowerCase();
    const optionValue = option.value.toLowerCase();
    
    return optionLabel.includes(searchValue) || optionValue.includes(searchValue);
  }) : options;
  
  return (
    <Combobox
      label="Currency"
      placeholder="Select currency"
      value={value}
      clearLabel="Clear"
      onClear={() => onChange({ target: { name, value: null } })}
      onChange={(v: string | undefined) => onChange({ target: { name, value: v ?? null } })}
      onInputChange={setInputValue}
    >
    {filteredOptions.map((o) => (
      <ComboboxOption key={o.value} value={o.value}>
        {o.label}
      </ComboboxOption>
    ))}
  </Combobox>
  );
};

export default CurrencySelect;
