import React from 'react';
import Select from 'react-select';
import { Box, Typography } from '@strapi/design-system';
import ISO6391 from 'iso-639-1';

const languages = ISO6391.getAllCodes().map(code => ({
  value: code,
  label: `${ISO6391.getNativeName(code)} (${code})`,
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const LanguageSelect: React.FC<Props> = ({ name, value, onChange }) => {
  const selected = languages.find(l => l.value === value) || null;

  return (
    <Box padding={1}>
      <Typography variant="pi" fontWeight="bold">{name}</Typography>

      <Select
        classNamePrefix="strapi"
        placeholder="Select language"
        options={languages}
        value={selected}
        onChange={opt =>
          onChange({ target: { name, value: opt ? opt.value : null } })
        }
        isClearable
      />
    </Box>
  );
};

export default LanguageSelect;
