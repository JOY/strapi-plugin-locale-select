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

  React.useEffect(() => {
    console.log('Currency inputValue:', inputValue);
  }, [inputValue]);

  // Lọc các options dựa trên giá trị nhập vào
  const safeInput = typeof inputValue === 'string' ? inputValue : '';
  const filteredOptions = safeInput ? options.filter(option => {
    const searchValue = safeInput.toLowerCase();
    // Ghép cả label và value để search, bỏ dấu, không phân biệt hoa thường
    return (
      option.label.toLowerCase().includes(searchValue) ||
      option.value.toLowerCase().includes(searchValue)
    );
  }) : options;

  return (
    <Combobox
      label="Currency"
      placeholder="Select currency"
      value={value}
      clearLabel="Clear"
      onClear={() => onChange({ target: { name, value: null } })}
      onChange={(v: string | undefined) => onChange({ target: { name, value: v ?? null } })}
      onSearch={setInputValue} // Thử dùng onSearch thay vì onInputChange
      // onInputChange={setInputValue} // Nếu onSearch không hoạt động, đổi lại dòng này
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
