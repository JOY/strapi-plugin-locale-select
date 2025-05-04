import React from 'react';
import { Typography } from '@strapi/design-system';
import ReactTimezoneSelect from 'react-timezone-select';
import { DateTime } from 'luxon';

const TimezonePicker = ({ name, value, onChange }) => {
  const selected = value || 'Asia/Ho_Chi_Minh';

  return (
    <>
      <Typography variant="pi" fontWeight="bold">{name}</Typography>

      <ReactTimezoneSelect
        value={selected}
        onChange={(tz) =>
          onChange({ target: { name, value: tz.value } })
        }
        labelStyle="original"
      />

      <Typography variant="sigma" textColor="neutral500">
        Giờ hiện tại:&nbsp;
        {DateTime.now().setZone(selected).toFormat('HH:mm – dd/MM/yyyy')}
      </Typography>
    </>
  );
};

export default TimezonePicker;
