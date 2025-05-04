import React from 'react';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import { Box, Typography } from '@strapi/design-system';

// ────────────────────────────────────────────────────────────
//  Register locale data (add more languages if you localise)
// ────────────────────────────────────────────────────────────
countries.registerLocale(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('i18n-iso-countries/langs/en.json')
);

// helper → ISO-3166 “VN” ⇒ 🇻🇳
const toFlag = (code: string) =>
  String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );

// build options only once
const options = Object.entries(
  countries.getNames('en', { select: 'official' })
).map(([code, name]) => ({
  value: code,
  label: `${toFlag(code)}  ${name} (${code})`,
}));

type Props = {
  name: string;
  value?: string | null;
  onChange: (e: { target: { name: string; value: string | null } }) => void;
};

const CountrySelect: React.FC<Props> = ({ name, value, onChange }) => {
  return (
    <Box padding={1}>
      <Typography variant="pi" fontWeight="bold">
        {name}
      </Typography>

      <Select
        classNamePrefix="strapi"
        placeholder="Select country"
        options={options}
        value={options.find((o) => o.value === value)}
        onChange={(opt) =>
          onChange({
            target: { name, value: opt ? (opt as any).value : null },
          })
        }
        isClearable
      />
    </Box>
  );
};

export default CountrySelect;
