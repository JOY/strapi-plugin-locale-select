import React from 'react';
import Select from 'react-select';
import { Box, Typography } from '@strapi/design-system';
import cc from 'currency-codes';
import flags from 'emoji-flags';

/** Build options one time */
const currencies = cc.data.map((c) => {
  // some currencies map to multiple countries – pick first for flag
  const country = c.countries?.[0] || '';
  const emoji   = flags.countryCode(country)?.emoji || '🏳️';

  return {
    value: c.code,                           // e.g. USD
    label: `${emoji}  ${c.currency} (${c.code})`
  };
});

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const CurrencySelect: React.FC<Props> = ({ name, value, onChange }) => {
  const selected = currencies.find(o => o.value === value) || null;

  return (
    <Box padding={1}>
      <Typography variant="pi" fontWeight="bold">{name}</Typography>

      <Select
        classNamePrefix="strapi"
        placeholder="Select currency"
        options={currencies}
        value={selected}
        onChange={(opt) =>
          onChange({ target: { name, value: opt ? opt.value : null } })
        }
        isClearable
      />
    </Box>
  );
};

export default CurrencySelect;
